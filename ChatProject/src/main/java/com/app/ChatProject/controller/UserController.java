/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.controller;

import com.app.ChatProject.entities.Users;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.repositories.UsersRepository;
import java.util.List;
import javax.annotation.Resource;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
        return usersRepository.findAll();
    }
    
    @RequestMapping(value = "/users", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Users createUsers(@Valid @RequestBody Users user){
        return usersRepository.save(user);
    }
    
    @GetMapping("/users/{id}")
    public Users getUserById(@PathVariable(value = "id") Integer userId){
        return usersRepository.findById(userId).
                orElseThrow(()->new ResourceNotFoundException("Users", "id", userId));
    }
    
    @PutMapping("users/{id}")
    public Users updateUser(@PathVariable(value = "id") Integer userId, @Valid @RequestBody Users userDetails){
        
        Users user= usersRepository.findById(userId).
                orElseThrow(()-> new ResourceNotFoundException("Users", "id", userId));
        
        user.setName(userDetails.getName());
        user.setLastname(userDetails.getLastname());
        user.setBirthday(userDetails.getBirthday());
        user.setMail(userDetails.getMail());
        user.setSex(userDetails.getSex());
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        
        Users updateUser= usersRepository.save(user);
        
        return updateUser;   
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Integer userId){
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        usersRepository.delete(user);
        
        return ResponseEntity.ok().build();
    }
}
