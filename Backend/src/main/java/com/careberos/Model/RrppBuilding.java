
package com.careberos.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class RrppBuilding {
 
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_rrppbuilding_rrpp")
    private Rrpp rrpp;
    
    @Column(columnDefinition="tinyint(1) default 0")
    private boolean active = false;
    
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="fk_rrppbuilding_building")
    private Building building;
    
    private float comission = 0;

    public Rrpp getRrpp() {
        return rrpp;
    }

    public void setRrpp(Rrpp rrpp) {
        this.rrpp = rrpp;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }
    
    
    public RrppBuilding(){}
    
    public long getId(){
        return id;
    }
    
    public void setId(long id){
        this.id = id;
    }

	public float getComission() {
		return comission;
	}

	public void setComission(float comission) {
		this.comission = comission;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
    
   
}
