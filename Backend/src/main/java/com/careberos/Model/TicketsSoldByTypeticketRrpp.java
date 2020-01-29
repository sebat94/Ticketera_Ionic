package com.careberos.Model;

public class TicketsSoldByTypeticketRrpp {
	private Typeticket typeticket;
	private int amount;
	private float moneyGenerated;
	private float moneyEarned;
	
	public TicketsSoldByTypeticketRrpp() {
		
	}

	public Typeticket getTypeticket() {
		return typeticket;
	}

	public void setTypeticket(Typeticket typeticket) {
		this.typeticket = typeticket;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public float getMoneyGenerated() {
		return moneyGenerated;
	}

	public void setMoneyGenerated(float moneyGenerated) {
		this.moneyGenerated = moneyGenerated;
	}

	public float getMoneyEarned() {
		return moneyEarned;
	}

	public void setMoneyEarned(float moneyEarned) {
		this.moneyEarned = moneyEarned;
	}
}
