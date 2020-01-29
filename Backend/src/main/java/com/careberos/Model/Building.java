package com.careberos.Model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.careberos.Model.Utils.TypeEstablishment;

/**
 * @author
 */
@Entity
public class Building {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

	private String name = "";
    
    private String address = "";
    
    private float lat = -1;
    
    private float lon = -1;
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_building_company")
    private Company company;
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_building_city")
    private City city;
    
    @Column(columnDefinition = "varchar(255) default 'imagen_building_default.jpg'")
    private String image;
    
    @Column(columnDefinition="tinyint(1) default 0")
    private boolean active = false;
    
    private TypeEstablishment type = TypeEstablishment.DISCO;
    
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public float getLon() {
        return lon;
    }

    public void setLon(float lon) {
        this.lon = lon;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    
    //private CiudadModel ciudad;

    public Building(){}
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDireccion() {
        return address;
    }

    public void setDireccion(String direccion) {
        this.address = direccion;
    }

	public TypeEstablishment getType() {
		return type;
	}

	public void setType(TypeEstablishment tipo) {
		this.type = tipo;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

    public City getCity(){
        return this.city;
    }
    
    public void setCity(City city){
        this.city = city;
    }
    
    public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
    
}
