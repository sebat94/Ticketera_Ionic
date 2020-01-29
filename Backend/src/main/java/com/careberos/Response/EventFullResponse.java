package com.careberos.Response;

import com.careberos.Model.EventFull;

public class EventFullResponse {
	private int code;
	private EventFull eventFull;
	
	public EventFullResponse() {}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public EventFull getEventFull() {
		return eventFull;
	}

	public void setEventFull(EventFull eventFull) {
		this.eventFull = eventFull;
	}
	
}
