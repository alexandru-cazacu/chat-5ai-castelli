/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author saul
 */
@Entity
@Table(name = "chat-user")
@XmlRootElement
public class ChatUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    
    @Column(name = "admin")
    private boolean admin;
    
    @Column(name = "last-seen")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastSeen;
    
    @JoinColumn(name = "id_user", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private Users idUser;
    
    @JoinColumn(name = "id_chat", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    //@JsonBackReference
    private Chats idChat;

    public ChatUser() {
    }

    public ChatUser(Integer id) {
        this.id = id;
    }

    public ChatUser(Integer id, boolean admin, Date lastSeen) {
        this.id = id;
        this.admin = admin;
        this.lastSeen = lastSeen;
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

    public Date getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(Date lastSeen) {
        this.lastSeen = lastSeen;
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
