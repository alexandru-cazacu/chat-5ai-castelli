package com.app.ChatProject.controllers;

import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.Message;
import com.app.ChatProject.entities.User;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.MessagesRepository;
import com.app.ChatProject.repositories.UsersRepository;
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
    private MessagesRepository messageRepository;

    /**
     * Create User
     *
     * @param user
     * @return
     */
    @PostMapping(value = "/users")
    public ResponseEntity<?> createUsers(@Valid @RequestBody User user) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        try {
            usersRepository.save(user);
        }
        catch (DataIntegrityViolationException e) {
            throw new UsernameException(user.getUsername());
        }

        return ResponseEntity.ok().build();
    }

    /**
     * Retrieve Users
     *
     * @param username
     * @return
     */
    @GetMapping("/users")
    public List<User> getUsersByUsername(@RequestParam(value = "searchByUsername", required = false) String username) {

        if (username == null) {
            List<User> users = usersRepository.findAll();
            return users;
        }

        List<User> users = usersRepository.findByNameOrSurnameOrUsernameStartingWith(username, username, username);

        if (users.isEmpty()) {
            throw new ResourceNotFoundException("User", "username, name or lastname", username);
        }
        return usersRepository.findByNameOrSurnameOrUsernameStartingWith(username, username, username);
    }

    /**
     * Retrieve User
     *
     * @param username
     * @return
     */
    @GetMapping("/users/{username}")
    public User getUserByUsername(@PathVariable(value = "username") String username) {
        User user = usersRepository.findByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", username);
        }

        return usersRepository.findByUsername(username);
    }

    /**
     * Update User
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
        }
        catch (DataIntegrityViolationException e) {
            throw new UsernameException(userDetails.getUsername());
        }
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());

        User updateUser = usersRepository.save(user);

        return ResponseEntity.ok().build();
    }

    /**
     * Delete User
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

    /**
     * Create Chat
     *
     * @param chat
     * @return
     */
    @PostMapping("/users/{username}/chats")
    public ResponseEntity<?> createChat(@Valid @RequestBody Chat chat) {
        String uId = UUID.randomUUID().toString();
        chat.setUid(uId);
        chat.setLink(uId);
        chatsRepository.save(chat);
        return ResponseEntity.ok().build();
    }

    /**
     * Retireve Chats
     *
     * @return
     */
    @GetMapping("/users/{username}/chats")
    public List<Chat> getChatByUsername() {

        List<Chat> chats = chatsRepository.findAll();
        return chats;
    }

    /**
     * Retireve Chat
     *
     * @param chatid
     * @return
     */
    @GetMapping("/users/{username}/chats/{chatid}")
    public Chat getChatByUsername(@PathVariable(value = "chatid") String chatid) {

        Chat chat = chatsRepository.findByUid(chatid);
        return chat;
    }

    /**
     *
     * @param username
     * @param chatid
     * @return
     */
    @GetMapping("/users/{username}/chats/{chatid}/messages")
    public List<Message> getMessages(@PathVariable(value = "username") String username, @PathVariable(value = "chatid") String chatid) {

        return null;

    }
}
