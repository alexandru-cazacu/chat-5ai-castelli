package com.app.ChatProject.controllers;

import com.app.ChatProject.JsonMaps.MessageMap;
import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.Message;
import com.app.ChatProject.entities.User;
import com.app.ChatProject.repositories.ChatUsersRepository;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.MessagesRepository;
import com.app.ChatProject.repositories.UsersRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Alex
 */
@RestController
public class MessageController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ChatsRepository chatsRepository;

    @Autowired
    private MessagesRepository messagesRepository;

    @Autowired
    private ChatUsersRepository chatUsersRepository;

    /**
     * Create Message.
     *
     * @param id
     * @param messageMap
     * @return
     */
    @PostMapping("/chats/{id}/messages")
    public ResponseEntity<?> createMessage(@PathVariable("id") int id, @Valid @RequestBody MessageMap messageMap) {

        Message msg = new Message();

        Optional<Chat> chat = chatsRepository.findById(id);
        User user = usersRepository.findByUsername(messageMap.getUsername());

        msg.setChat(chat.get());
        msg.setContent(messageMap.getContent());
        msg.setType(messageMap.getType());
        msg.setUser(user);

        messagesRepository.save(msg);

        URI location = URI.create("/chats/" + chat.get().getId() + "/messages");

        return ResponseEntity.created(location).body("");
    }

    /**
     * Retrieve Messages.
     *
     * @param id
     * @return
     */
    @GetMapping("/chats/{id}/messages")
    public List<Message> getMessages(@PathVariable("id") int id) {

        return messagesRepository.findByChatId(id);
    }
}
