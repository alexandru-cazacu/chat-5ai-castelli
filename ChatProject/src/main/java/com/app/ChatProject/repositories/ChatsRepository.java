package com.app.ChatProject.repositories;

import com.app.ChatProject.model.Chats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatsRepository extends JpaRepository<Chats, Integer> {
    public Chats findByUid(String uid);

}
