/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.controller;

import com.app.ChatProject.model.Users;
import com.app.ChatProject.exception.MailException;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.UsersRepository;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author saul
 */
@RestController
@RequestMapping("/chatty")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/users")
    public List<Users> getAllUsers(){
        List<Users> users=usersRepository.findAll();
        return users;
    }

    @PostMapping("/users")
    public Users createUsers(@Valid @RequestBody Users user){
        PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        String hashedPassword= passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        try{
            usersRepository.save(user);
        } catch(DataIntegrityViolationException e ){
            if(usersRepository.findByUsername(user.getUsername())!=null){
                throw new UsernameException(user.getUsername());
            }
            if(usersRepository.findByMail(user.getMail())!=null){
                throw new MailException(user.getMail());
            }
        }

        return usersRepository.save(user);
    }
    
    @GetMapping("/users/{username}")
    public Users getUserByUsername(@PathVariable(value = "username") String userName){
        Users user=usersRepository.findByUsername(userName);
        
        if(user==null){
            throw new ResourceNotFoundException("User", "username", userName);
        }
        return usersRepository.findByUsername(userName);
    }
    
    @GetMapping("/search")
    public List<Users> getUsersByUsername(/*@PathVariable(value = "username") String userName*/@RequestParam("byUser") String userName){
        List <Users> users=usersRepository.findByNameOrLastnameOrUsernameStartingWith(userName, userName, userName);
        
        if(users.isEmpty()){
            throw new ResourceNotFoundException("User", "username, name or lastname", userName);
        }
        return usersRepository.findByNameOrLastnameOrUsernameStartingWith(userName, userName, userName);
    }
    
    @PutMapping("users/{username}")
    public Users updateUser(@PathVariable(value = "username") String userName, @Valid @RequestBody Users userDetails){
        
        Users user= usersRepository.findByUsername(userName);
        
        if(user==null){
            throw new ResourceNotFoundException("User", "username", userName);
        }
        
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
