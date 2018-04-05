package com.app.ChatProject.repositories;

import com.app.ChatProject.model.ChatUser;
import com.app.ChatProject.model.Chats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatUserRepository  extends JpaRepository<ChatUser, Integer> {
    public List<Chats> findByIdUserAndIdChat(int id_user, int id_chat);
}
