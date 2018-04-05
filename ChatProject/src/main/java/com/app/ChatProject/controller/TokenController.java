package com.app.ChatProject.controller;

import com.app.ChatProject.model.JwtUser;
import com.app.ChatProject.security.JwtGenerator;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
public class TokenController {

    private JwtGenerator jwtGenerator;

    public TokenController(JwtGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping
    public String generate(@RequestBody final JwtUser jwtUser){

        return jwtGenerator.generate(jwtUser);
    }
}
