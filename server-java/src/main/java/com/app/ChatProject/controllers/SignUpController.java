package com.app.ChatProject.controllers;

import com.app.ChatProject.entities.User;
import com.app.ChatProject.exception.MailException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping
    public User createUsers(@Valid @RequestBody User user){

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

}
