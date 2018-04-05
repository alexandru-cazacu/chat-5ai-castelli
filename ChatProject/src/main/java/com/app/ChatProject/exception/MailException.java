package com.app.ChatProject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class MailException extends RuntimeException{
    private String mail;

    public MailException(String mail){
        super(String.format("The mail %s is already used in another account. Please used another", mail));
        this.mail = mail;
    }
}
