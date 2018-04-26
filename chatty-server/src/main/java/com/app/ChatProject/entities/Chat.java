package com.app.ChatProject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author saul
 */
@Entity
@Table(name = "chats")
public class Chat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "uid")
    private String uid;

    @Column(name = "link")
    @JsonIgnore
    private String link;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "chat")
    @JsonIgnore // Used to return only chat.
    private List<Message> messages;

    @OneToMany(mappedBy = "chat")
    //@JsonIgnore // Used to return only chat.
    private List<ChatUser> chatUsers;

    public Chat() {
    }

    public Chat(Integer id) {
        this.id = id;
    }

    public Chat(Integer id, String uid, String link, String name, List<Message> messages, List<ChatUser> chatUsers) {
        this.id = id;
        this.uid = uid;
        this.link = link;
        this.name = name;
        this.messages = messages;
        this.chatUsers = chatUsers;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<ChatUser> getChatUsers() {
        return chatUsers;
    }

    public void setChatUsers(List<ChatUser> chatUsers) {
        this.chatUsers = chatUsers;
    }

}
