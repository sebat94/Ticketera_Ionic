package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.Building;
import com.careberos.Model.Company;

public class BuildingsResponse {
	private int code;
	
	private ArrayList<Building> buildings = new ArrayList<>();
	
	public BuildingsResponse(){}

	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
	
	public ArrayList<Building> getBuildings() {
		return buildings;
	}


	public void setBuildings(ArrayList<Building> buildings) {
		this.buildings = buildings;
	}

}
