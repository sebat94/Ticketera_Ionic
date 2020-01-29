package com.careberos.Response;

import com.careberos.Model.Event;

public class EventResponse {
	private int code;
	private Event event = new Event();
	
	public EventResponse() {}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}
}
