/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.ChatProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author saul
 */
@Entity
@Table(name = "users")
public class Users implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "lastname")
    private String lastname;
    
    @Column(name = "birthday")
    @Temporal(TemporalType.DATE)
    private Date birthday;
    
    @Column(name = "sex")
    private String sex;
    
    @Column(name = "mail")
    private String mail;

    @Column(name = "username")
    private String username;
    

    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idUser")
    @JsonIgnore
    private List<ChatUser> chatUsers;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idUser")
    @JsonIgnore
    private List<Messages> messages;

    public Users() {
    }

    public Users(Integer id) {
        this.id = id;
    }

    public Users(Integer id, String name, String lastname, Date birthday, String sex, String mail, String username, String password) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.birthday = birthday;
        this.sex = sex;
        this.mail = mail;
        this.username = username;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<ChatUser> getChatUsers() {
        return chatUsers;
    }

    public void setChatUsers(List<ChatUser> chatUsers) {
        this.chatUsers = chatUsers;
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
        if (!(object instanceof Users)) {
            return false;
        }
        Users other = (Users) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.app.ChatProject.model.Users[ id=" + id + " ]";
    }
    
}
