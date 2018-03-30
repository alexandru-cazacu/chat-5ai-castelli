/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.controller;

import com.app.ChatProject.entities.Users;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.UsersRepository;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author saul
 */
@RestController
@RequestMapping("/chatty")
public class UserController {
    
    @Autowired
    private UsersRepository usersRepository;
    
    
    @GetMapping("/users")
    public List<Users> getAllUsers(){
        List<Users> users=usersRepository.findAll();
        return users;
    }
    
    @PostMapping(value = "/users")
    public Users createUsers(@Valid @RequestBody Users user){
        PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        String hashedPassword= passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        try{
            usersRepository.save(user);
        } catch(DataIntegrityViolationException e){
            throw new UsernameException(user.getUsername());
        }
        
        return usersRepository.save(user);
    }
    
    @GetMapping("/search/{username}")
    public List<Users> getUserByUsername(@PathVariable(value = "username") String userName){
        List <Users> users=usersRepository.findByNameOrLastnameOrUsernameStartingWith("%"+userName, "%"+userName, "%"+userName);
        
        if(users.isEmpty()){
            throw new ResourceNotFoundException("User", "username", userName);
        }
        return usersRepository.findByNameOrLastnameOrUsernameStartingWith("%"+userName, "%"+userName, "%"+userName);
    }
    
    @PutMapping("users/{username}")
    public Users updateUser(@PathVariable(value = "username") String userName, @Valid @RequestBody Users userDetails){
        
        Users user= usersRepository.findByUsername(userName);
        
        user.setName(userDetails.getName());
        user.setLastname(userDetails.getLastname());
        user.setBirthday(userDetails.getBirthday());
        user.setMail(userDetails.getMail());
        user.setSex(userDetails.getSex());
        try {
           user.setUsername(userDetails.getUsername());
        } catch (DataIntegrityViolationException e) {
            throw new UsernameException(userDetails.getUsername());
        }
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        
        Users updateUser= usersRepository.save(user);
        
        return updateUser;   
    }
    
    @DeleteMapping("/users/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "username") String userName){
        Users user = usersRepository.findByUsername(userName);
        
        usersRepository.delete(user);
        
        return ResponseEntity.ok().build();
    }
}
