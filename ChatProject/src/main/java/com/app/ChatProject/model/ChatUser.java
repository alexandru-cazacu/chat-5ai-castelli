/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author saul
 */
@Entity
@Table(name = "chat_user")
@XmlRootElement
public class ChatUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "admin")
    private boolean admin;


    @JoinColumn(name = "id_user", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private Users idUser;

    @JoinColumn(name = "id_chat", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private Chats idChat;

    public ChatUser() {
    }

    public ChatUser(Integer id) {
        this.id = id;
    }

    public ChatUser(Integer id, boolean admin, Date lastSeen) {
        this.id = id;
        this.admin = admin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public boolean isAdmin() {
        return admin;
    }

    public Users getIdUser() {
        return idUser;
    }

    public void setIdUser(Users idUser) {
        this.idUser = idUser;
    }

    public Chats getIdChat() {
        return idChat;
    }

    public void setIdChat(Chats idChat) {
        this.idChat = idChat;
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
        if (!(object instanceof ChatUser)) {
            return false;
        }
        ChatUser other = (ChatUser) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.app.ChatProject.model.ChatUser[ id=" + id + " ]";
    }
    
}
