package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.Company;

public class CompaniesReponse {
	private int code;
	
	private ArrayList<Company> companies = new ArrayList<>();
	
	public CompaniesReponse(){}

	public ArrayList<Company> getCompanies() {
		return companies;
	}

	public void setCompanies(ArrayList<Company> companies) {
		this.companies = companies;
	}
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

}
