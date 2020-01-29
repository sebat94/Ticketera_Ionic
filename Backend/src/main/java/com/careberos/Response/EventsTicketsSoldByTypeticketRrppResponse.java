package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.EventTicketsSoldByTypeticketRrpp;

public class EventsTicketsSoldByTypeticketRrppResponse {
	private int code;
	private ArrayList<EventTicketsSoldByTypeticketRrpp> eventTicketsSoldByTypeticketRrpp = new ArrayList<>();
	
	public EventsTicketsSoldByTypeticketRrppResponse() {}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public ArrayList<EventTicketsSoldByTypeticketRrpp> getEventTicketsSoldByTypeticketRrpp() {
		return eventTicketsSoldByTypeticketRrpp;
	}

	public void setEventTicketsSoldByTypeticketRrpp(
			ArrayList<EventTicketsSoldByTypeticketRrpp> eventTicketsSoldByTypeticketRrpp) {
		this.eventTicketsSoldByTypeticketRrpp = eventTicketsSoldByTypeticketRrpp;
	}

}
