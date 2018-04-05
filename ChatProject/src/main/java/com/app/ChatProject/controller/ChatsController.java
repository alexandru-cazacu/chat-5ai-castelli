package com.app.ChatProject.controller;


import com.app.ChatProject.model.ChatUser;
import com.app.ChatProject.model.Chats;
import com.app.ChatProject.model.Users;
import com.app.ChatProject.repositories.ChatUserRepository;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chatty")
public class ChatsController {

    @Autowired
    private ChatsRepository chatsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ChatUserRepository chatUserRepository;

    @PostMapping("/users/{username}/chats")
    public Chats createChat(@Valid @RequestBody Chats chat, @PathVariable(value = "username") String username){
        chatsRepository.save(chat);
        Users user=usersRepository.findByUsername(username);

        ChatUser chatUser=new ChatUser();
        chatUser.setIdChat(chat);
        chatUser.setIdUser(user);

        chatUserRepository.save(chatUser);

        user.addChatUser(chatUser);

        chat.addChatUser(chatUser);

        return chatsRepository.save(chat);
    }

    @GetMapping("/users/{username}/chats/{chat_id}")
    public List<Chats> getChats(@PathVariable(value = "username") String username, @PathVariable(value = "chat_id") int id){
        Users users=usersRepository.findByUsername(username);

        List<Chats> chats=chatUserRepository.findByIdUserAndIdChat(users.getId(), id);

        return chats;
    }
}
