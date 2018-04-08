package com.app.ChatProject.controllers;

import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.Message;
import com.app.ChatProject.repositories.ChatUsersRepository;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.MessagesRepository;
import com.app.ChatProject.repositories.UsersRepository;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*")
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
