package com.app.ChatProject.JsonMaps;

import java.util.List;

/**
 *
 * @author Alex
 */
public class CompactChat {

    private String uid;
    private String name;
    private List<CompactMessage> messages;
    private List<CompactUser> users;

    public CompactChat() {
    }

    public CompactChat(String uid, String name, List<CompactMessage> messages, List<CompactUser> users) {
        this.uid = uid;
        this.name = name;
        this.messages = messages;
        this.users = users;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CompactMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<CompactMessage> messages) {
        this.messages = messages;
    }

    public List<CompactUser> getUsers() {
        return users;
    }

    public void setUsers(List<CompactUser> users) {
        this.users = users;
    }

}
