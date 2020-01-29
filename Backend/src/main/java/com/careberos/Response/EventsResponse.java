package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.Event;

public class EventsResponse {
	private int code;
	private String message;
	private Iterable<Event> events = new ArrayList<>();
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Iterable<Event> getEvents() {
		return events;
	}

	public void setEvents(Iterable<Event> events) {
		this.events = events;
	}
	
	public EventsResponse() {
		
	}
}
