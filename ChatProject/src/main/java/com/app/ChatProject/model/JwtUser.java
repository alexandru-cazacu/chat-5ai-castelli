package com.app.ChatProject.model;

public class  JwtUser {
    private String userName;
    private long id;
    private String role;

    public void setUserName(String userName) {
        this.userName=userName;
    }

    public void setId(long userId) {
        this.id=userId;
    }

    public void setRole(String role) {
        this.role=role;
    }

    public String getUserName() {
        return userName;
    }

    public long getId() {
        return id;
    }

    public String getRole() {
        return role;
    }
}
