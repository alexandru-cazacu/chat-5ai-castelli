package com.app.ChatProject.repositories;

import com.app.ChatProject.entities.Message;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Alex
 */
@Repository
public interface MessagesRepository extends JpaRepository<Message, Integer> {

    public List<Message> findByChatUid(String uid);
    public List<Message> findByChatId(int id);
}
