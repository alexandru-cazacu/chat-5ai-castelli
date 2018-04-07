package com.app.ChatProject.controllers;

import com.app.ChatProject.JsonMaps.ChatUserMap;
import com.app.ChatProject.JsonMaps.UserMap;
import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.ChatUser;
import com.app.ChatProject.entities.Message;
import com.app.ChatProject.entities.User;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.MessagesRepository;
import com.app.ChatProject.repositories.UsersRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import org.hibernate.validator.internal.util.logging.Messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.app.ChatProject.repositories.ChatUsersRepository;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author saul
 */
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class RESTController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ChatsRepository chatsRepository;

    @Autowired
    private MessagesRepository messagesRepository;

    @Autowired
    private ChatUsersRepository chatUsersRepository;

    /**
     * Create User.
     *
     * @param user
     * @return
     */
    @PostMapping(value = "/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        try {
            usersRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new UsernameException(user.getUsername());
        }

        return ResponseEntity.ok().build();
    }

    /**
     * Retrieve Users.
     *
     * @param username
     * @param mode
     * @return
     */
    @GetMapping("/users")
    public List<?> getUsers(
            @RequestParam(value = "searchByUsername", required = false) String username,
            @RequestParam(value = "mode", required = false) String mode) {

        List<User> users;

        // Searches Users by string.
        if (username != null) {
            users = usersRepository.findByNameOrSurnameOrUsernameStartingWith(username, username, username);

            if (users.isEmpty()) {
                throw new ResourceNotFoundException("User", "username, name or lastname", username);
            }
        } // Gets all Users.
        else {
            users = usersRepository.findAll();
        }

        if (mode != null && mode.equals("compact")) {
            List<UserMap> userMaps = new ArrayList();

            for (User user : users) {
                userMaps.add(new UserMap(user.getUsername()));
            }

            return userMaps;
        }
        
        return users;
    }

    /**
     * Retrieve User.
     *
     * @param username
     * @return
     */
    @GetMapping("/users/{username}")
    public User getUser(@PathVariable(value = "username") String username) {

        User user = usersRepository.findByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", username);
        }

        return usersRepository.findByUsername(username);
    }

    /**
     * Update User.
     *
     * @param username
     * @param userDetails
     * @return
     */
    @PutMapping("/users/{username}")
    public ResponseEntity<?> updateUser(@PathVariable(value = "username") String username, @Valid @RequestBody User userDetails) {

        User user = usersRepository.findByUsername(username);

        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setBirthday(userDetails.getBirthday());
        user.setMail(userDetails.getMail());
        user.setSex(userDetails.getSex());
        try {
            user.setUsername(userDetails.getUsername());
        } catch (DataIntegrityViolationException e) {
            throw new UsernameException(userDetails.getUsername());
        }
        user.setUsername(userDetails.getUsername());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userDetails.getPassword());
        user.setPassword(hashedPassword);

        User updateUser = usersRepository.save(user);

        return ResponseEntity.ok().build();
    }

    /**
     * Delete User.
     *
     * @param username
     * @return
     */
    @DeleteMapping("/users/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "username") String username) {

        User user = usersRepository.findByUsername(username);

        usersRepository.delete(user);

        return ResponseEntity.ok().build();
    }

    // ================================================================================
    /**
     * Create Chat.
     *
     * @param username
     * @param chatUserMap
     * @return
     */
    @PostMapping("/users/{username}/chats")
    public ResponseEntity<?> createChat(@PathVariable("username") String username, @Valid @RequestBody ChatUserMap chatUserMap) {

        String uId = UUID.randomUUID().toString();

        Chat chat = new Chat();
        chat.setUid(uId);
        chat.setLink(uId);
        chat.setName(chatUserMap.getChatName());

        chatsRepository.save(chat);

        for (int i = 0; i < chatUserMap.getUsers().size(); i++) {
            User user = usersRepository.findByUsername(chatUserMap.getUsers().get(i).getUsername());

            ChatUser chatUser = new ChatUser();
            chatUser.setUser(user);
            chatUser.setChat(chat);
            chatUser.setAdmin(chatUserMap.getUsers().get(i).isIsAdmin());

            chatUsersRepository.save(chatUser);
        }

        return ResponseEntity.ok().build();
    }

    /**
     * Retrieve Chats.
     *
     * @param username
     * @return
     */
    @GetMapping("/users/{username}/chats")
    public List<Chat> getUserChats(@PathVariable("username") String username) {

        List<ChatUser> chatUsers = chatUsersRepository.findByUserUsername(username);

        List<Chat> chats = new ArrayList();

        for (int i = 0; i < chatUsers.size(); i++) {
            Chat chat = chatUsers.get(i).getChat();
            chats.add(chat);
        }

        return chats;
    }

    /**
     * Retrieve Chat.
     *
     * @param chatid
     * @return
     */
    @GetMapping("/chats/{chatid}")
    public Chat getChat(@PathVariable(value = "chatid") String chatid) {

        Chat chat = chatsRepository.findByUid(chatid);
        return chat;
    }

    // ================================================================================
    /**
     * Create Message.
     *
     * @param chatid
     * @param message
     * @return
     */
    @PostMapping("/chats/{chatid}/messages")
    public ResponseEntity<?> createMessage(@PathVariable(value = "chatid") String chatid, @Valid @RequestBody Message message) {

        Message msg = new Message();

        Chat chat = chatsRepository.findByUid(chatid);

        msg.setChat(chat);
        msg.setContent(message.getContent());
        msg.setType(message.getType());
        msg.setUser(usersRepository.findByUsername(message.getUser().getUsername()));

        messagesRepository.save(msg);

        return ResponseEntity.ok().build();
    }

    /**
     * Retrieve Messages.
     *
     * @param chatid
     * @return
     */
    @GetMapping("/chats/{chatid}/messages")
    public List<Message> getMessages(@PathVariable(value = "chatid") String chatid) {

        return messagesRepository.findByChatUid(chatid);
    }
}
