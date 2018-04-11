package com.app.ChatProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableJpaAuditing
public class ChatProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatProjectApplication.class, args);
    }
}
