/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.repositories;

import com.app.ChatProject.entities.Chat;
import com.app.ChatProject.entities.Message;
import com.app.ChatProject.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Alex
 */
@Repository
public interface MessagesRepository extends JpaRepository<Chat, Integer> {

    
}
