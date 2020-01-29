package com.careberos.Response.Statistics;

import java.util.ArrayList;

import com.careberos.Model.SellsDates;

public class SellsByDate {
	private int code;
	private SellsDates sellsDates = new SellsDates();
			
	public SellsByDate() {}
	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}

	public SellsDates getSellsDates() {
		return sellsDates;
	}

	public void setSellsDates(SellsDates sellsDates) {
		this.sellsDates = sellsDates;
	}
	
	
	
}
