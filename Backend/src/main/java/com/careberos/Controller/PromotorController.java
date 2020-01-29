package com.careberos.Controller;

import com.careberos.Model.Admin;
import com.careberos.Model.Ticket;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.lang3.time.DateUtils;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.Authtoken;
import com.careberos.Model.Building;
import com.careberos.Model.Company;
import com.careberos.Model.Event;
import com.careberos.Model.Promotor;
import com.careberos.Model.Rrpp;
import com.careberos.Model.RrppBuilding;
import com.careberos.Model.SellsDate;
import com.careberos.Model.SellsDates;
import com.careberos.Model.User;
import com.careberos.Repository.AdminRepository;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.CityRepository;
import com.careberos.Repository.UserRepository;
import com.careberos.Response.TicketsResponse;
import com.careberos.Response.Statistics.SellsByDate;
import com.careberos.Repository.BuildingRepository;
import com.careberos.Repository.CompanyRepository;
import com.careberos.Repository.EventRepository;
import com.careberos.Repository.PromotorRepository;
import com.careberos.Repository.RrppBuildingRepository;
import com.careberos.Repository.RrppRepository;
import com.careberos.Repository.TicketRepository;

@RestController
@RequestMapping(path="/promotor")
public class PromotorController {
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private BuildingRepository br;
        
    @Autowired
    private CompanyRepository cr;
	
	@Autowired
	private AuthtokenRepository atr;
        
    @Autowired
    private PromotorRepository pr;
    
    @Autowired
    private AdminRepository ar;
    
    @Autowired
    private RrppRepository rpr;
    
    @Autowired
    private TicketRepository tr;
    
    @Autowired
    private EventRepository er;
    
    @Autowired
    private RrppBuildingRepository rrppbr;
	
		
	@RequestMapping(value="/ticketsSoldByRrpp/{idCompany}/{idRrpp}/{idBuilding}/{idEvent}", method = RequestMethod.GET)
	public @ResponseBody int getTicketsSoldByRrpp(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idCompany") String idCompany, @PathVariable(value="idRrpp") String idRrpp, @PathVariable(value="idBuilding") Long idBuilding, @PathVariable(value="idEvent") Long idEvent) {
		int number = 0;
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			// Si salta excepción es que no existe el company
			Company company = cr.findOne(Long.parseLong(idCompany));
			if(company.getPromotor().getUser().getId() == u.getId()) {
				// Si salta excepción es que no existe el rrpp
				Rrpp rrpp = rpr.findOne(Long.parseLong(idRrpp));
				boolean isEventAvailable = false;
				boolean isBuildingAvailable = false;
				
				Building building = null;
				RrppBuilding rrppBuilding = null;
				if(idBuilding != -1) {
					// Si salta excepción es que no existe el building
					building = br.findOne(idBuilding);
					// Si salta excepción es que el rrpp no pertenece al building
					rrppBuilding = rrppbr.findByRrppAndBuilding(rrpp, building);
					isBuildingAvailable = true;
				}
								
				boolean error = false;
				Event event = null;
				if(idEvent != -1) {
					// Si salta excepción es que no existe el event
					event = er.findOne(idEvent);
					isEventAvailable = true;
					if(building != null) {
						// Si no coinciden el event no pertenece al building
						if(event.getBuilding().getId() != building.getId()) {
							error = true;
						}
					}
				}
				
				if(!error) {
					Iterator<Ticket> iteratorTickets = tr.findTicketsByRrppSeller(rrpp).iterator();

					while(iteratorTickets.hasNext()) {
						Ticket t = iteratorTickets.next();
						boolean remove = false;
						if(t.getTypeticket().getEvent().getBuilding().getCompany().getId() != company.getId()) {
							remove = true;
						} else if(isBuildingAvailable && t.getTypeticket().getEvent().getBuilding().getId() != building.getId()) {
							remove = true;
						} else if(isEventAvailable && t.getTypeticket().getEvent().getId() != event.getId()) {
							remove = true;
						}
						
						if(remove)
							iteratorTickets.remove();
						else
							number ++;
					}
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
			number = -1;
		}
		return number;
	}
	
	/** Statistics **/
	
	@RequestMapping(value="/sts/getSellsByBuildingAndDays/{idBuilding}/{days}", method = RequestMethod.GET)
	public @ResponseBody SellsByDate getSellsByBuildingAndDays(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idBuilding") Long idBuilding, @PathVariable(value="days") int days) {
		SellsByDate sellsByDate = new SellsByDate();
		
		try {
			String token = authHeader.split(" ")[1];

			Authtoken a = atr.findByToken(token);
			User u = a.getUser();

			Building b = br.findOne(idBuilding);

			if(b.getCompany().getPromotor().getUser().getId() == u.getId()) {
				sellsByDate.setCode(200);

				if(days == -1) days = 30;
				
				Date today = new Date();
				Date dateInit = DateUtils.addDays(today, -(days));

				SellsDates sd = new SellsDates();
				ArrayList<SellsDate> original = new ArrayList<>();

				original = (ArrayList<SellsDate>) pr.getTicketsSoldByBuildingAndDate(new java.sql.Date(dateInit.getTime()), new java.sql.Date(today.getTime()), b.getId());

				ArrayList<SellsDate> copia = new ArrayList<>();
				ArrayList<SellsDate> lista = new ArrayList<>();

				for(int i = 0; i < original.size(); i++) {
					try {
						SellsDate s = original.get(i);
						s.setDateString(s.getDateString().split(" ")[0]);
						copia.add(s);
					} catch(Exception e) {}
				}

				for(int i = 0; i < days; i++) {
					Date d = DateUtils.addDays(dateInit, i+1);
					
					boolean encontrado = false;
					int pos = 0;
					for(int j = 0; j < copia.size() && !encontrado; j++) {
						if(copia.get(j).getDateString().equals(new java.sql.Date(d.getTime()).toString())) {
							encontrado = true;
							pos = j;
						}
					}
					
					if(!encontrado) {
						lista.add(new SellsDate(new java.sql.Date(d.getTime()).toString(), 0l));
					} else {
						lista.add(copia.get(pos));
					}
				}

				sd.setSellsDate(lista);
				sellsByDate.setSellsDates(sd);
			} else {
				sellsByDate.setCode(403);
			}
		} catch(Exception e) {
			sellsByDate.setCode(500);
			e.printStackTrace();
		}
		
		return sellsByDate;
	}
	
	/** End statistics **/
	
}
