package com.careberos.Model;

import java.util.ArrayList;

public class EventWithImages {
	private Event event;
	private ArrayList<EventImages> eventImages = new ArrayList<>();
	
	public EventWithImages() {}

	

	public ArrayList<EventImages> getEventImages() {
		return eventImages;
	}

	public void setEventImages(ArrayList<EventImages> eventImages) {
		this.eventImages = eventImages;
	}



	public Event getEvent() {
		return event;
	}



	public void setEvent(Event event) {
		this.event = event;
	}
	
	
}
