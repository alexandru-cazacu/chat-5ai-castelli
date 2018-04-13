package com.app.ChatProject.JsonMaps;

/**
 *
 * @author Alex
 */
public class CompactMessage {

    private String content;
    private String type;
    private String username;

    public CompactMessage() {
    }

    public CompactMessage(String content, String type, String username) {
        this.content = content;
        this.type = type;
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
