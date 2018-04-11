package com.app.ChatProject.controllers;

import com.app.ChatProject.JsonMaps.ChatUserMap;
import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.ChatUser;
import com.app.ChatProject.entities.User;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.repositories.ChatUsersRepository;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.MessagesRepository;
import com.app.ChatProject.repositories.UsersRepository;
import com.app.ChatProject.security.JwtUtil;
import com.sun.jndi.toolkit.url.Uri;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Alex
 */
@RestController
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ChatsRepository chatsRepository;

    @Autowired
    private MessagesRepository messagesRepository;

    @Autowired
    private ChatUsersRepository chatUsersRepository;

    /**
     * Create Chat.
     *
     * @param
     * @param chatUserMap
     * @return
     */
    @PostMapping("/users/chats")
    public ResponseEntity<?> createChat(
            @Valid @RequestBody ChatUserMap chatUserMap, HttpServletRequest request) {
        
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
        
        ChatUser chatUser = new ChatUser();

        String token= request.getHeader("Authorization");

        JwtUtil jwtUtil=new JwtUtil();
        String userName=jwtUtil.getUsernameFromToken(token);
        User user=usersRepository.findByUsername(userName);
        
        chatUser.setUser(user);
        chatUser.setChat(chat);
        chatUser.setAdmin(true);
        
        chatUsersRepository.save(chatUser);
        
        URI location = URI.create("/chats/" + chat.getId());
        
        return ResponseEntity.created(location).body("");
    }

    /**
     * Retrieve Chats.
     *
     * @param
     * @return
     */
    @GetMapping("/users/chats")
    public List<Chat> getUserChats(HttpServletRequest request) {
        String token= request.getHeader("Authorization");

        JwtUtil jwtUtil=new JwtUtil();
        String userName=jwtUtil.getUsernameFromToken(token);
        User user=usersRepository.findByUsername(userName);

        List<ChatUser> chatUsers = chatUsersRepository.findByUserId(user.getId());

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
     * @param id
     * @return
     */
    @GetMapping("/chats/{id}")
    public Chat getChat(@PathVariable("id") int id) {

        Optional<Chat> chat = chatsRepository.findById(id);

        return chat.get();
    }
}
