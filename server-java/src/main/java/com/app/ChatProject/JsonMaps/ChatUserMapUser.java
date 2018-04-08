package com.app.ChatProject.JsonMaps;

/**
 *
 * @author Alex
 */
public class ChatUserMapUser {

    String username;
    boolean isAdmin;

    public ChatUserMapUser() {
    }

    public ChatUserMapUser(String username, boolean isAdmin) {
        this.username = username;
        this.isAdmin = isAdmin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

}
