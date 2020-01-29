package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.Ticket;

public class TicketsResponse {
	private int code;
	private ArrayList<Ticket> tickets = new ArrayList<>();

	public TicketsResponse() {
		
	}
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public ArrayList<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(ArrayList<Ticket> tickets) {
		this.tickets = tickets;
	}

	
	
}
