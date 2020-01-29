
package com.careberos.Model;

import java.util.ArrayList;

/**
 *
 * @author user
 */
public class EventFull {
    
    private Event event;
    
    private float price = -1;
    
    private int soldTickets = -1;
    
    private int totalTickets = -1;
    
    private ArrayList<Typeticket> typetickets = new ArrayList<>();
    
    private ArrayList<EventImages> eventImages = new ArrayList<>();
    
    public ArrayList<EventImages> getEventImages() {
		return eventImages;
	}

	public void setEventImages(ArrayList<EventImages> eventImages) {
		this.eventImages = eventImages;
	}

	public EventFull(){}

    public EventFull(Event e, float p, int available, int total, ArrayList<EventImages> eventImages, ArrayList<Typeticket> tts){
        event = e;
        price = p;
        soldTickets = available;
        totalTickets = total;
        this.eventImages = eventImages;
        this.typetickets = tts;
    }
    
    public void setPrice(float p){
        this.price = p;
    }
    
    public float getPrice(){
        return price;
    }

    public int getSoldTickets() {
        return soldTickets;
    }

    public void setSoldTickets(int availableTickets) {
        this.soldTickets = availableTickets;
    }

    public int getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

	public ArrayList<Typeticket> getTypetickets() {
		return typetickets;
	}

	public void setTypetickets(ArrayList<Typeticket> typetickets) {
		this.typetickets = typetickets;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}    
    
    
}
