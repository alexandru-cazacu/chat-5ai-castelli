package com.app.ChatProject.controllers;

import com.app.ChatProject.JsonMaps.ChatUserMap;
import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.ChatUser;
import com.app.ChatProject.entities.User;
import com.app.ChatProject.repositories.ChatUsersRepository;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.MessagesRepository;
import com.app.ChatProject.repositories.UsersRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
}
