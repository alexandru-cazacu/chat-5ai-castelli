/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author saul
 */
@Entity
@Table(name = "chats")
public class Chats implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    
    @Column(name = "uid")
    private String uid;
    
    @Column(name = "link")
    private String link;

    @OneToMany(cascade = CascadeType.ALL , mappedBy = "idChat")
    private List<ChatUser> chatUsersers;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idChat")
    private List<Messages> messages;

    public Chats() {
    }

    public Chats(Integer id) {
        this.id = id;
    }

    public Chats(Integer id, String uid, String link) {
        this.id = id;
        this.uid = uid;
        this.link = link;
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

    public List<ChatUser> getChatUsersers() {
        return chatUsersers;
    }

    public void setChatUsersers(List<ChatUser> chatUsersers) {
        this.chatUsersers = chatUsersers;
    }

    public List<Messages> getMessages() {
        return messages;
    }

    public void setMessages(List<Messages> messages) {
        this.messages = messages;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Chats)) {
            return false;
        }
        Chats other = (Chats) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.app.ChatProject.model.Chats[ id=" + id + " ]";
    }
    
}
