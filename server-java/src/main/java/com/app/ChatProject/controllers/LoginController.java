package com.app.ChatProject.controllers;

import com.app.ChatProject.entities.User;
import com.app.ChatProject.jwtModel.JwtAuthenticationResponse;
import com.app.ChatProject.jwtModel.JwtUser;
import com.app.ChatProject.repositories.UsersRepository;
import com.app.ChatProject.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.http.HTTPException;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UsersRepository usersRepository;

    private JwtUtil jwtGenerator;

    public LoginController(JwtUtil jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping
    public ResponseEntity generate(@RequestBody JwtUser jwtUser){
        BCryptPasswordEncoder passwordEncoder= new BCryptPasswordEncoder();

        //System.out.println(hashedPassword);

        User user =usersRepository.findByUsername(jwtUser.getUsername());

        //System.out.println(user.getPassword());

        if(passwordEncoder.matches(jwtUser.getPassword(), user.getPassword())) {
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwtGenerator.generate(jwtUser)));
        }
        throw new HTTPException(401);
    }
}
