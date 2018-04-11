package com.app.ChatProject.controller;

import com.app.ChatProject.jwtModel.JwtAuthenticationResponse;
import com.app.ChatProject.jwtModel.JwtUser;
import com.app.ChatProject.model.Users;
import com.app.ChatProject.repositories.UsersRepository;
import com.app.ChatProject.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
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
        PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        String hashedPassword= passwordEncoder.encode(jwtUser.getPassword());

        System.out.println(hashedPassword);

        Users user =usersRepository.findByUsername(jwtUser.getUsername());

        System.out.println(user.getPassword());

        if(user.getPassword().matches(hashedPassword)) {
            System.out.println(jwtUser.getUsername());
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwtGenerator.generate(jwtUser)));
        }
        throw new HTTPException(401);
    }
}
