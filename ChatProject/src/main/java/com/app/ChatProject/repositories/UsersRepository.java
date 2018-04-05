/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.repositories;

import com.app.ChatProject.model.Users;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author saul
 */
@Repository
public interface UsersRepository extends JpaRepository<Users, Integer>{
    
    public List<Users> findByNameOrLastnameOrUsernameStartingWith(String name, String lastname, String username);
    public Users findByUsername(String username);
    public Users findByMail(String mail);

    Optional<Users> findByName(String username);
}
