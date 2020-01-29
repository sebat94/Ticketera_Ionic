package com.careberos.Model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Ticket {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="fk_ticket_typeticket")
	private Typeticket typeticket;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="fk_ticket_user")
	private User user;
	
	private Timestamp soldDate = new Timestamp(System.currentTimeMillis());
	private String dateString;
	
	public Timestamp getSoldDate() {
		return soldDate;
	}

	public void setSoldDate(Timestamp soldDate) {
		this.soldDate = soldDate;
	}

	public String getDateString() {
		return dateString;
	}

	public void setDateString(String dateString) {
		this.dateString = dateString;
	}

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="fk_ticket_rrppSeller")
	private Rrpp rrppSeller;
	
	@Column(columnDefinition="tinyint(1) default 0")
    private boolean active = false;
	
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Ticket() {
		
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public Typeticket getTypeticket() {
		return typeticket;
	}

	public void setTypeticket(Typeticket typeticket) {
		this.typeticket = typeticket;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Rrpp getRrppSeller() {
		return rrppSeller;
	}

	public void setRrppSeller(Rrpp rrppSeller) {
		this.rrppSeller = rrppSeller;
	}

	
}
