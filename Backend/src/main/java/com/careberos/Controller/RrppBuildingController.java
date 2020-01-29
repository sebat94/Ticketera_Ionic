package com.careberos.Controller;

import java.io.File;
import java.math.BigInteger;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.commons.lang3.time.DateUtils;
import org.mindrot.jbcrypt.BCrypt;
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
import com.careberos.Model.EventImages;
import com.careberos.Model.EventTicketsSoldByTypeticketRrpp;
import com.careberos.Model.EventWithImages;
import com.careberos.Model.Promotor;
import com.careberos.Model.Rrpp;
import com.careberos.Model.RrppBuilding;
import com.careberos.Model.SellsDate;
import com.careberos.Model.SellsDates;
import com.careberos.Model.Ticket;
import com.careberos.Model.TicketsSoldByTypeticketRrpp;
import com.careberos.Model.Typeticket;
import com.careberos.Model.User;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.BuildingRepository;
import com.careberos.Repository.RrppBuildingRepository;
import com.careberos.Repository.RrppRepository;
import com.careberos.Repository.TicketRepository;
import com.careberos.Repository.TypeticketRepository;
import com.careberos.Repository.UserRepository;
import com.careberos.Response.BuildingsResponse;
import com.careberos.Response.EventsTicketsSoldByTypeticketRrppResponse;
import com.careberos.Response.EventsWithImagesResponse;
import com.careberos.Response.RrppsResponse;
import com.careberos.Response.Statistics.SellsByDate;

import antlr.Utils;
import com.careberos.Repository.EventRepository;
import com.careberos.Repository.PromotorRepository;

@RestController
@RequestMapping(path="/rrppbuilding")
public class RrppBuildingController {
	@Autowired
	private AuthtokenRepository atr;
	
	@Autowired
	private RrppBuildingRepository rrppb;
	
	@Autowired
	private BuildingRepository br;
	
	@Autowired
	private RrppRepository rpr;
	
	@Autowired
	private TypeticketRepository ttr;
	
	@Autowired
	private TicketRepository tr;
	
	@Autowired
	private UserRepository ur;
        
    @Autowired
    private EventRepository er;
    
    @Autowired
    private PromotorRepository pr;
	
	@RequestMapping(path="/{id}", method = RequestMethod.POST)
	public @ResponseBody String updateRppBuilding(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload, @PathVariable(value="id") String idRrppBuilding) {
		String response = "";
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			RrppBuilding rrppBuilding = rrppb.findOne(Long.parseLong(idRrppBuilding));
			if(rrppBuilding.getBuilding().getCompany().getPromotor().getUser().getId() == u.getId()) {
				Building lastBuilding = rrppBuilding.getBuilding();
				Float lastComission = rrppBuilding.getComission();
				Boolean lastActive = rrppBuilding.isActive();
				boolean isComissionAvailable = false;
				Float comission = -1f;				
				try {
					comission = Float.parseFloat(payload.get("comission").toString());
					isComissionAvailable = true;
				} catch(Exception ex) {}
				
				boolean isBuildingAvailable = false;
				long buildingId = (long) -1;				
				try {
					buildingId = Long.parseLong(payload.get("building").toString());
					isBuildingAvailable = true;
				} catch(Exception ex) {}
				
				boolean isActiveAvailable = false;
				boolean active = false;
				try {
					active = Boolean.parseBoolean(payload.get("active").toString());
					isActiveAvailable = true;
				} catch(Exception ex) {}
				
				if(isComissionAvailable) rrppBuilding.setComission(comission);
				else rrppBuilding.setComission(lastComission);
				
				if(isBuildingAvailable) rrppBuilding.setBuilding(br.findOne(buildingId));
				else rrppBuilding.setBuilding(lastBuilding);
				
				if(isActiveAvailable) rrppBuilding.setActive(active);
				else rrppBuilding.setActive(lastActive);
				
				rrppb.save(rrppBuilding);
				response = "RRPP editado correctamente";
				
			} else {
				response = "403. No eres promotor de esta empresa";
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			response = "error";
		}
		return response;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String createRppBuilding(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		String response = "";
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = null;
			try {
				rrpp = rpr.findByUser(u);
			} catch(Exception ex) {}
			if(rrpp != null) {
				RrppBuilding rrppBuilding = new RrppBuilding();
				rrppBuilding.setActive(false);
				rrppBuilding.setBuilding(br.findOne(Long.parseLong(payload.get("building").toString())));
				rrppBuilding.setRrpp(rrpp);
				rrppb.save(rrppBuilding);
				response = "Solicitud enviada correctamente";
			} else {
				response = "403. No eres rrpp";
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			response = "error";
		}
		return response;
	}
	
	@RequestMapping(value="/sellTicket", method = RequestMethod.POST)
	public @ResponseBody String sellTicket(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		String respuesta = "";
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			Typeticket tt = ttr.findOne(Long.parseLong(payload.get("typeticket").toString()));
			Building building = tt.getEvent().getBuilding();
			RrppBuilding rrppBuilding = rrppb.findByRrppAndBuilding(rrpp, building);
			// Si no salta excepción => es un rrpp de ese building
                     
			// Si está registrado
			Ticket t = new Ticket();
			
			if(tt.getAmountSold() < tt.getTotalAmount()) {
				User userBuyer = null;
				boolean isUserRegistered = false;
				try {
					userBuyer = ur.findByEmail(payload.get("userBuyer").toString());
				} catch(Exception ex) {}
				if(userBuyer != null) isUserRegistered = true;
				tt.setAmountSold(tt.getAmountSold()+1);
				ttr.save(tt);
				
				t.setTypeticket(tt);
				t.setRrppSeller(rpr.findByUser(u));
				
				if(isUserRegistered) {
					t.setActive(true);
				} else {
					userBuyer = new User();
					userBuyer.setEmail(payload.get("userBuyer").toString());
					userBuyer.setPassword(BCrypt.hashpw(payload.get("dni").toString(), BCrypt.gensalt(12)));
					userBuyer = ur.save(userBuyer);
					String link = "http://localhost:8080/user/register/" + userBuyer.getId();
					String msg = "Hola, <br/><br/>Acaba de comprar una entrada para el evento "+ tt.getEvent().getName() + " para el día "
					+ tt.getEvent().getDate() + " por el precio de " + tt.getPrice() + "&euro;<br/><br/>" 
					+ "Para activar su entrada, debe registrarse haciendo clic en el siguiente <a href='" + link 
					+ "'>enlace</a>.<br/><br/>Introduzca su email y en la contraseña su DNI.<br/><br/>Gracias por confiar en Ticketera.<br/><br/>Atentamente,<br/>El equipo.";
					com.careberos.Controller.Utils.Utils.sendMail("pausaentoloslaos", "Admin2015#", userBuyer.getEmail(), "", "Ticketera Confirmación compra", msg);
				}
				t.setUser(userBuyer);
				tr.save(t);
				respuesta = "Entrada comprada correctamente";
			} else {
				respuesta = "Entradas agotadas";
			}
			
		} catch (AddressException e) {
			e.printStackTrace();
			respuesta = "Error enviando email";
		} catch (MessagingException e) {
			e.printStackTrace();
			respuesta = "Error enviando email";
		}catch(Exception ex) {
			ex.printStackTrace();
			respuesta = "error";
		}
		return respuesta;
	}
	
	@RequestMapping(value="/getCompanies", method = RequestMethod.GET)
	public @ResponseBody Iterable<Company> getMyCompanies(@RequestHeader("Authorization") String authHeader) {
		ArrayList<Company> companies = new ArrayList<>();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			companies = (ArrayList<Company>) rrppb.findCompaniesByRrpp(rrpp.getId());
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return companies;
	}
	
	@RequestMapping(value="/getBuildingsEvents/{idBuilding}", method = RequestMethod.GET)
	public @ResponseBody Iterable<Event> getEventsByBuilding(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idBuilding") Long idBuilding) {
		ArrayList<Event> events = new ArrayList<>();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			if(rrpp != null) {
				events = (ArrayList<Event>) rrppb.findNotPassedEventsByRrppAndBuilding(rrpp.getId(), idBuilding);
			} 
		} catch(Exception e) {
			e.printStackTrace();
		}
		return events;
	}

        @RequestMapping(value="/getBuildings/{idCompany}", method = RequestMethod.GET)
	public @ResponseBody Iterable<Building> getBuildingsByCompany(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idCompany") Long idCompany) {
		ArrayList<Building> buildings = new ArrayList<>();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			buildings = (ArrayList<Building>) rrppb.findBuildingsByRrppAndCompany(rrpp.getId(), idCompany);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return buildings;
	}

    @RequestMapping(value="/Buildings", method = RequestMethod.GET)
	public @ResponseBody Iterable<Building> getBuildingsByRrpp(@RequestHeader("Authorization") String authHeader) {
		ArrayList<Building> buildings = new ArrayList<>();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			buildings = (ArrayList<Building>) rrppb.findBuildingsByRrpp(rrpp.getId());
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return buildings;
	}
	
	@RequestMapping(value="/getEvents", method = RequestMethod.GET)
	public @ResponseBody Iterable<Event> getEvents(@RequestHeader("Authorization") String authHeader) {
		ArrayList<Event> events = new ArrayList<>();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			events = (ArrayList<Event>) rrppb.findEventsByRrpp(rrpp.getId());
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return events;
	}
	
	@RequestMapping(value="/soldTicketsByBuildingAndRrpp/{idBuilding}/{idRrpp}", method = RequestMethod.GET)
	public @ResponseBody EventsTicketsSoldByTypeticketRrppResponse getSoldTicketsByBuildingAndRrpp(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idBuilding") Long idBuilding, @PathVariable(value="idRrpp") Long idRrpp) {
		EventsTicketsSoldByTypeticketRrppResponse eventsTicketsSoldByTypeticketRrppResponse = new EventsTicketsSoldByTypeticketRrppResponse();
		
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Building b = br.findOne(idBuilding);
			
			Rrpp rrpp = null;
			RrppBuilding rrppBuilding = null;
			
			boolean esPromotor = false;
			boolean esRrpp = false;
			
			try {
				rrpp = rpr.findByUser(u);
				rrppBuilding = rrppb.findByRrppAndBuilding(rrpp, b);
				if(u.getId() == idRrpp) {
					esRrpp = true;
				}
			} catch(Exception e) {}
			
			if(!esRrpp) {
				Promotor p = pr.findByUser(u);
				if(b.getCompany().getPromotor().getId() == p.getId()) {
					User userRrpp = ur.findOne(idRrpp);
					rrpp = rpr.findByUser(userRrpp);
					rrppBuilding = rrppb.findByRrppAndBuilding(rrpp, b);
					esPromotor = true;
				} else {
					// Error no es promotor
				}
			}
			
			if(esRrpp || esPromotor) {
			
				ArrayList<Event> events = (ArrayList<Event>) er.findEventsByBuilding(b);
				ArrayList<EventTicketsSoldByTypeticketRrpp> list = new ArrayList<>();
				for(Event e : events) {
					ArrayList<Typeticket> typetickets = (ArrayList<Typeticket>) ttr.findByEvent(e);
					ArrayList<TicketsSoldByTypeticketRrpp> lista2 = new ArrayList<>();
					for(Typeticket t : typetickets) {
						TicketsSoldByTypeticketRrpp aux2 = new TicketsSoldByTypeticketRrpp();
						int amount = tr.getSoldTicketsByRrpp(rrpp.getId(), t.getId());
						aux2.setAmount(amount);
						aux2.setTypeticket(t);
						float moneyGenerated = amount*t.getPrice();
						aux2.setMoneyGenerated(moneyGenerated);
						aux2.setMoneyEarned(moneyGenerated*rrppBuilding.getComission() / 100f);
						lista2.add(aux2);
					}
					
					EventTicketsSoldByTypeticketRrpp aux = new EventTicketsSoldByTypeticketRrpp();
					aux.setEvent(e);
					aux.setTicketsSoldByTypeticketRrpp(lista2);
					
					list.add(aux);
				}
				
				eventsTicketsSoldByTypeticketRrppResponse.setCode(200);
				eventsTicketsSoldByTypeticketRrppResponse.setEventTicketsSoldByTypeticketRrpp(list);
			} else {
				eventsTicketsSoldByTypeticketRrppResponse.setCode(403);
			}
		} catch(Exception e) {
			e.printStackTrace();
			eventsTicketsSoldByTypeticketRrppResponse.setCode(500);
		}
		
		return eventsTicketsSoldByTypeticketRrppResponse;
	}
	
	@RequestMapping(value="/getRrppByBuilding/{idBuilding}", method = RequestMethod.GET)
	public @ResponseBody RrppsResponse getRrppByBuilding(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idBuilding") Long idBuilding) {
		RrppsResponse res = new RrppsResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Promotor p = pr.findByUser(u);
			Building b = br.findOne(idBuilding);
			if(b.getCompany().getPromotor().getId() == p.getId()) {
				ArrayList<RrppBuilding> aux = (ArrayList<RrppBuilding>) rrppb.findByBuilding(b);
				ArrayList<Rrpp> lista = new ArrayList<>();
				for(RrppBuilding item: aux) {
					lista.add(item.getRrpp());
				}
				res.setCode(200);
				res.setRrpps(lista);
			} else {
				res.setCode(403);
			}
		} catch(Exception e) {
			e.printStackTrace();
			res.setCode(500);
		}
		return res;
	}
	
	/** Statistics **/
	@RequestMapping(value="/sts/getsellsbydaysandoptionalevent/{idEvent}/{days}", method = RequestMethod.GET)
	public @ResponseBody SellsByDate stsGetSellsByDaysAndOptionalEvent(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idEvent") Long idEvent, @PathVariable(value="days") int days) {
		SellsByDate sellsByDate = new SellsByDate();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp r = rpr.findByUser(u);
			if(r != null) {
				sellsByDate.setCode(200);
				
				if(days == -1) days = 30;
				
				Date today = new Date();
				Date dateInit = DateUtils.addDays(today, -(days));
				
				SellsDates sd = new SellsDates();
				ArrayList<SellsDate> original = new ArrayList<>();
				if(idEvent == -1) {
					original = (ArrayList<SellsDate>) rrppb.getTicketsSoldByRrpp(r.getId(), new java.sql.Date(dateInit.getTime()), new java.sql.Date(today.getTime()));
				} else {
					original = (ArrayList<SellsDate>) rrppb.getTicketsSoldByRrppAndEvent(r.getId(), new java.sql.Date(dateInit.getTime()), new java.sql.Date(today.getTime()), idEvent);
				}
				
				ArrayList<SellsDate> copia = new ArrayList<>();
				ArrayList<SellsDate> lista = new ArrayList<>();
				
				for(int i = 0; i < original.size(); i++) {
					SellsDate s = original.get(i);
					s.setDateString(s.getDateString().split(" ")[0]);
					copia.add(s);
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
			e.printStackTrace();
			sellsByDate.setCode(500);
		}
		
		return sellsByDate;
	}
	/** End statistics **/
	
	
	
}
