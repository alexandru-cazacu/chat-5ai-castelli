package com.app.ChatProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ChatProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatProjectApplication.class, args);
    }
}
