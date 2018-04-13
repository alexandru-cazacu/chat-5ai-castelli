package com.app.ChatProject.repositories;

import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Alex
 */
@Repository
public interface ChatsRepository extends JpaRepository<Chat, Integer> {

    public Chat findByUid(String uid);

}
