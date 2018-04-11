/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.controller;

import com.app.ChatProject.model.Users;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.UsersRepository;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.app.ChatProject.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
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



    /*@GetMapping("/users")
    public List<Users> getAllUsers(){
        List<Users> users=usersRepository.findAll();
        return users;
    }*/
    
    /*@GetMapping("/users/{username}")
    public Users getUserByUsername(@PathVariable(value = "username") String userName){
        Users user=usersRepository.findByUsername(userName);
        
        if(user==null){
            throw new ResourceNotFoundException("User", "username", userName);
        }
        return usersRepository.findByUsername(userName);
    }*/

    @GetMapping("/users")
    public Users getUserByUsername(HttpServletRequest request){

        String token= request.getHeader("Authorization");

        JwtUtil jwtUtil=new JwtUtil();
        String userName=jwtUtil.getUsernameFromToken(token);
        Users user=usersRepository.findByUsername(userName);

        if(user==null){
            throw new ResourceNotFoundException("User", "username", userName);
        }
        return usersRepository.findByUsername(userName);
    }
    
    @GetMapping("/search")
    public List<Users> getUsersByUsername(@RequestParam("byUser") String userName){
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
