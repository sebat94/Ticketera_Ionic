package com.careberos.Model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_admin_user")
    private User user;
    
    public Admin(){}

    public int getId(){
        return id;
    }
    
    public void setId(int id){
        this.id = id;
    }
    
    public User getUser(){
        return this.user;
    }
    
    public void setUser(User user){
        this.user = user;
    }
    
    
}
