package com.app.ChatProject.repositories;

import com.app.ChatProject.entities.ChatUser;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Alex
 */
public interface ChatUsersRepository extends JpaRepository<ChatUser, Integer> {

    public List<ChatUser> findByUserUsername(String username);
}
