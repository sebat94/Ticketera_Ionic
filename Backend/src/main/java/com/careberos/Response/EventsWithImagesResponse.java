package com.careberos.Response;

import java.util.ArrayList;

import com.careberos.Model.EventWithImages;

public class EventsWithImagesResponse {
	private int code;
	private ArrayList<EventWithImages> eventsWithImages = new ArrayList<>();
	
	public EventsWithImagesResponse() {}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public ArrayList<EventWithImages> getEventsWithImages() {
		return eventsWithImages;
	}

	public void setEventsWithImages(ArrayList<EventWithImages> eventsWithImages) {
		this.eventsWithImages = eventsWithImages;
	}
	
	
	
}
