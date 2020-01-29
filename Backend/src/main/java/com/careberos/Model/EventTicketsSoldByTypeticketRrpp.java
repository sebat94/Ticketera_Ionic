package com.careberos.Model;

import java.util.ArrayList;

public class EventTicketsSoldByTypeticketRrpp {
	private ArrayList<TicketsSoldByTypeticketRrpp> ticketsSoldByTypeticketRrpp = new ArrayList<>();
	private Event event;
	
	public EventTicketsSoldByTypeticketRrpp() {}

	public ArrayList<TicketsSoldByTypeticketRrpp> getTicketsSoldByTypeticketRrpp() {
		return ticketsSoldByTypeticketRrpp;
	}

	public void setTicketsSoldByTypeticketRrpp(ArrayList<TicketsSoldByTypeticketRrpp> ticketsSoldByTypeticketRrpp) {
		this.ticketsSoldByTypeticketRrpp = ticketsSoldByTypeticketRrpp;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	
}
