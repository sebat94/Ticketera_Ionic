package com.careberos.Model;

import java.sql.Timestamp;

public class SellsDate {
	private String dateString;
	private Long sells;
	
	public SellsDate() {

	}
	
	







	public String getDateString() {
		return dateString;
	}





	public void setDateString(String dateString) {
		this.dateString = dateString;
	}





	public SellsDate(String dateString, Long sells) {
		super();
		this.dateString = dateString;
		this.sells = sells;
	}





	public Long getSells() {
		return sells;
	}

	public void setSells(Long sells) {
		this.sells = sells;
	}
	
	
}
