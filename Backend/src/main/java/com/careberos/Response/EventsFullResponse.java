package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.EventFull;

public class EventsFullResponse {
	private int code;
	private ArrayList<EventFull> eventsFull = new ArrayList<>();
	
	public EventsFullResponse() {}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public ArrayList<EventFull> getEventsFull() {
		return eventsFull;
	}

	public void setEventsFull(ArrayList<EventFull> eventsFull) {
		this.eventsFull = eventsFull;
	}
	
	
	
	
}
