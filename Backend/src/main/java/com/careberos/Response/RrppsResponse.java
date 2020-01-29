package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.Rrpp;

public class RrppsResponse {
	private int code = 200;
	private Iterable<Rrpp> rrpps = new ArrayList<>();
	public RrppsResponse() {
		
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public Iterable<Rrpp> getRrpps() {
		return rrpps;
	}
	public void setRrpps(Iterable<Rrpp> rrpps) {
		this.rrpps = rrpps;
	}
	
}
