package com.careberos.Model;

import java.sql.Timestamp;
import java.util.List;
import javax.persistence.CascadeType;
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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class Event {
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name = "";
    
    private Timestamp date = new Timestamp(System.currentTimeMillis());
    
    private Timestamp finishDate = new Timestamp(System.currentTimeMillis());
    
    private String dateToString = "";
    
    @Column(columnDefinition = "varchar(255) default 'imagen_event_pdf_default.jpg'")
    private String imagePdf;
    
	@ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_event_building")
    private Building building;
    
    public Event(){}
        public String getDateToString() {
		return dateToString;
	}

	public void setDateToString(String date) {
		this.dateToString = date;
	}

    public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy hh:mm");
        dateToString = dateFormat.format(date);
        this.date = date;
	}

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

	public Building getBuilding() {
		return building;
	}

	public void setBuilding(Building building) {
		this.building = building;
	}
	
	public Timestamp getFinishDate() {
		return finishDate;
	}
	
	public void setFinishDate(Timestamp finishDate) {
		this.finishDate = finishDate;
	}
	
	public String getImagePdf() {
		return imagePdf;
	}
	
	public void setImagePdf(String imagePdf) {
		this.imagePdf = imagePdf;
	}
}

