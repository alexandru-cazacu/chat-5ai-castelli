/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author saul
 */
@ResponseStatus(value = HttpStatus.CONFLICT)
public class UsernameException extends RuntimeException{
    private String username;
    
    public UsernameException(String username){
        super(String.format("The username %s is already taken. Please choose another", username));
        this.username = username;
    }
    
}
