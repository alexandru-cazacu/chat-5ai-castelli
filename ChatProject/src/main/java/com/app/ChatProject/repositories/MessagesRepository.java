package com.app.ChatProject.repositories;

import com.app.ChatProject.model.Chats;
import com.app.ChatProject.model.Messages;
import com.app.ChatProject.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, Integer> {

    //List<Messages> findByIdUserAndByIdChat(Users idUser, Chats idChat);
}
