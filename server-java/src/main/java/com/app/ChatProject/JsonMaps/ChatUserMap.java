/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.JsonMaps;

import java.util.List;

/**
 *
 * @author Alex
 */
public class ChatUserMap {

    String chatName;
    List<ChatUserMapUser> users;

    public ChatUserMap() {
    }

    public ChatUserMap(String chatName, List<ChatUserMapUser> users) {
        this.chatName = chatName;
        this.users = users;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public List<ChatUserMapUser> getUsers() {
        return users;
    }

    public void setUsers(List<ChatUserMapUser> users) {
        this.users = users;
    }

}
