
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
public class Rrppjefe {
 
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_rrppjefe_master")
    private Rrpp master;
    
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_rrppjefe_employee")
    private Rrpp employee;
    
    @Column(columnDefinition="tinyint(1) default 0")
    private boolean active = false;
    
    public Rrppjefe(){}
    
    public long getId(){
        return id;
    }
    
    public void setId(long id){
        this.id = id;
    }
    
    public Rrpp getMaster(){
        return master;
    }
    
    public void setMaster(Rrpp master){
        this.master = master;
    }
    
    public Rrpp getEmployee(){
        return employee;
    }
    
    public void setEmployee(Rrpp employee){
        this.employee = employee;
    }

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
