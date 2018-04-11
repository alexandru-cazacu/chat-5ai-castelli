package com.app.ChatProject.controller;


import com.app.ChatProject.model.ChatUser;
import com.app.ChatProject.model.Chats;
import com.app.ChatProject.model.Messages;
import com.app.ChatProject.model.Users;
import com.app.ChatProject.repositories.ChatUserRepository;
import com.app.ChatProject.repositories.ChatsRepository;
import com.app.ChatProject.repositories.MessagesRepository;
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
    private  ChatUserRepository chatUserRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private MessagesRepository messagesRepository;

    @PostMapping("/users/{username}/chats")
    public String createChat(@Valid @RequestBody Messages message, @PathVariable(value = "username") String username, @RequestParam("contact") String contact){

        if(message!=null){

        }
        Chats chat=new Chats();
        chat.setUid("nsdfadfaf");
        chat.setLink("suifgbaidsfa");

        try{
            chatsRepository.save(chat);
        }
        catch (Exception e){
            System.out.println("Non funziona");
        }
        Users user=usersRepository.findByUsername(username);
        Users contactUser=usersRepository.findByUsername(contact);

        ChatUser chatUser1=new ChatUser();
        chatUser1.setIdChat(chat);
        chatUser1.setIdUser(user);

        ChatUser chatUser2=new ChatUser();
        chatUser2.setIdChat(chat);
        chatUser2.setIdUser(user);

        chatUserRepository.save(chatUser1);
        chatUserRepository.save(chatUser2);

        return "ok";
    }

    /*@GetMapping("/users/{username}/chats/")
    public List<Chats> getChats(@PathVariable(value = "username") String username, @PathVariable(value = "chat_id") int id){
        Users users=usersRepository.findByUsername(username);

        List<Chats> chats=chatUserRepository.findByIdUserAndIdChat(users.getId(), id);

        return chats;
    }

    @GetMapping("/users/{username}/chats/{chat_id}/messages")
    public List<Messages> getMessages(@PathVariable(value = "username") String username, @PathVariable(value = "chat_id") String uid){
        Users user=usersRepository.findByUsername(username);
        Chats chat=chatsRepository.findByUid(uid);

        List<Messages> messages=messagesRepository.findByIdUserAndByIdChat(user, chat);

        return messages;
    }*/
}
