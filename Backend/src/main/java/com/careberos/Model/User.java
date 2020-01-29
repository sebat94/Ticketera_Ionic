package com.careberos.Model;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.careberos.Model.Utils.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 *
 * @author
 */

@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = true)
    private String name = "";
    @Column(nullable = true)
    private String lastname = "";
    
    private String email = "";
    
    private Gender gender = Gender.OTHER;
    
    @Column(nullable = true)
    private String birthdate = "";
    
    @Column(columnDefinition="tinyint(1) default 0")
    private boolean active = false;
    
    private String dni = "";
    
    @Column(columnDefinition = "varchar(255) default 'imagen_user_default.jpg'")
    private String image;
    
    @JsonIgnore
    private String password;
    
    public User() {}
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User(String usuario){
        gender = Gender.OTHER;
    }
    
    public User(Long id, String usuario, String nombre, String apellidos, String email, Gender sexo, String fechaNacimiento, String passwordCifrado, int salt) {
        this.id = id;
        this.name = nombre;
        this.lastname = apellidos;
        this.email = email;
        this.gender = sexo;
        this.birthdate = fechaNacimiento;
    }

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
    
}
