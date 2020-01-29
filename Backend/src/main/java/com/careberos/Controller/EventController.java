package com.careberos.Controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Controller.Utils.Utils;
import com.careberos.Model.Authtoken;
import com.careberos.Model.City;
import com.careberos.Model.Building;
import com.careberos.Model.Event;
import com.careberos.Model.EventFull;
import com.careberos.Model.EventImages;
import com.careberos.Model.EventWithImages;
import com.careberos.Model.Promotor;
import com.careberos.Model.Rrpp;
import com.careberos.Model.Typeticket;
import com.careberos.Model.User;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.CityRepository;
import com.careberos.Repository.EventImagesRepository;
import com.careberos.Repository.EventRepository;
import com.careberos.Repository.TypeticketRepository;
import com.careberos.Response.BasicIntResponse;
import com.careberos.Response.BasicResponse;
import com.careberos.Response.BuildingsResponse;
import com.careberos.Response.EventFullResponse;
import com.careberos.Response.EventResponse;
import com.careberos.Response.EventsFullResponse;
import com.careberos.Response.EventsResponse;
import com.careberos.Response.EventsWithImagesResponse;

import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import com.careberos.Repository.BuildingRepository;
import com.careberos.Repository.PromotorRepository;
import com.careberos.Repository.RrppRepository;

@RestController
@RequestMapping(path="/event")
public class EventController {
	@Autowired
	private EventRepository err;
	
	@Autowired
	private BuildingRepository brr;
	
	@Autowired
	private CityRepository ctr;
	
	@Autowired
	private AuthtokenRepository atr;
        
	@Autowired
	private TypeticketRepository ttr;
	
	@Autowired
	private PromotorRepository pr;

    @Autowired
	private RrppRepository rr;
        
    @Autowired
	private EventImagesRepository eventImagesRepository;
    
    @PersistenceUnit
    private EntityManagerFactory emf;
        
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody EventsWithImagesResponse readAllEvents() {
		EventsWithImagesResponse eventsWithImagesResponse = new EventsWithImagesResponse();
		
		try {
			ArrayList<Event> events = (ArrayList<Event>) err.findAll();
			ArrayList<EventWithImages> ewis = new ArrayList<>();
			for(Event e : events) {
				ArrayList<EventImages> eventImages = (ArrayList<EventImages>) eventImagesRepository.findEventImagesByEvent(e);
				EventWithImages ewi = new EventWithImages();
				ewi.setEvent(e);
				ewi.setEventImages(eventImages);
				ewis.add(ewi);
			}
			
			eventsWithImagesResponse.setCode(200);
			eventsWithImagesResponse.setEventsWithImages(ewis);
		} catch(Exception e) {}
		
		return eventsWithImagesResponse;
	}
	
	@RequestMapping(path="/count", method = RequestMethod.GET)
	public @ResponseBody BasicIntResponse getCountOfEvents() {
		BasicIntResponse br = new BasicIntResponse();
		
		try {
			br.setCode(200);
			br.setCount(err.countOfEvents());
		} catch(Exception e) {
			br.setCode(500);
			e.printStackTrace();
		}
		
		return br;
	}
	
	@RequestMapping(path="/pageable/{limit}/{offset}", method = RequestMethod.POST)
	public @ResponseBody EventsFullResponse getEvents(@PathVariable(value="limit") int limit, @PathVariable(value="offset") int offset, @RequestBody Map<String, Object> payload) {
		EventsFullResponse eventsFullResponse = new EventsFullResponse();
		try {
			HashMap<String, Integer> ids = new HashMap<>();
			ids.put("dateMax", -1);
			ids.put("maxPrice", -1);
			ids.put("dateMin", -1);
			ids.put("minPrice", -1);
			
			int cant = 1;
			
			EntityManager em = emf.createEntityManager();
			String select = "SELECT e.* FROM Event e WHERE";
			/** Get filters **/
			boolean fFechaMax = false;
			String fechaMax = "";
			Date dateMax = new Date();
			try {
				fechaMax = payload.get("dateMax").toString();
				fFechaMax = true;
			} catch(Exception e) {}
			
			if(fFechaMax) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
				dateMax = dateFormat.parse(fechaMax + " 23:59");
				select += " e.date <= ?";
				ids.put("dateMax", cant);
				cant++;
			}
			
			boolean fFechaMin = false;
			String fechaMin = "";
			Date dateMin = new Date();
			
			try {
				fechaMin = payload.get("dateMin").toString();
				fFechaMin = true;
			} catch(Exception e) {}
			
			if(fFechaMin) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
				dateMin = dateFormat.parse(fechaMin + " 00:00");
				if(cant > 1) select += " and";
				select += " e.date >= ?";
				ids.put("dateMin", cant);
				cant++;
			}
			
			boolean fMaxPrice = false;
			float maxPrice = -1f;
			try {
				maxPrice = Float.parseFloat(payload.get("maxPrice").toString());
				fMaxPrice = true;
			} catch(Exception e) {}
			
			if(fMaxPrice) {
				if(cant > 1) select += " and";
				select += " (SELECT min(t.price) FROM Typeticket t where t.fk_typeticket_event = e.id) <= ?";
				ids.put("maxPrice", cant);
				cant++;
			}
			
			boolean fMinPrice = false;
			float minPrice = -1f;
			try {
				minPrice = Float.parseFloat(payload.get("minPrice").toString());
				fMinPrice = true;
			} catch(Exception e) {}
			
			if(fMinPrice) {
				if(cant > 1) select += " and";
				select += " (SELECT min(t.price) FROM Typeticket t where t.fk_typeticket_event = e.id) >= ?";
				ids.put("minPrice", cant);
				cant++;
			}
			
			
			/** Fin filters **/
			if(!fFechaMin) {
				if(cant > 1) select += " and";
				select += " e.date >= now()";
			}
			
			// Añadimos offset y limit
			if(limit != -1 && offset != -1) {
				select += " limit " + limit + " offset " + offset;
			}
			
			System.out.println("Select: " + select);
			
			Query q =  em.createNativeQuery(select, Event.class);
			if(fFechaMax) {
				q.setParameter(ids.get("dateMax"), new java.sql.Timestamp(dateMax.getTime()));
			}
			if(fFechaMin) {
				q.setParameter(ids.get("dateMin"), new java.sql.Timestamp(dateMin.getTime()));
			}
			if(fMaxPrice) {
				q.setParameter(ids.get("maxPrice"), maxPrice);
			}
			if(fMinPrice) {
				q.setParameter(ids.get("minPrice"), minPrice);
			}
			
			ArrayList<Event> events = (ArrayList<Event>) q.getResultList();
			ArrayList<EventFull> eventsFull = new ArrayList<>();
			
			for(Event e : events) {
				Typeticket t = null;
				try {
					t = ttr.findMinPrinceTypeticketByEvent(e.getId());
				} catch(Exception e2) {}
				if(t != null) {
					ArrayList<EventImages> eventImages = null;
					try {
						eventImages = (ArrayList<EventImages>) eventImagesRepository.findEventImagesByEvent(e);
					} catch(Exception e2) {}
					if(eventImages == null) {
						eventImages = new ArrayList<>();
					}
					ArrayList<Typeticket> typetickets = null;
					try {
						typetickets = (ArrayList<Typeticket>) ttr.findByEvent(e);
					} catch(Exception e2) {}
					if(typetickets == null) {
						typetickets = new ArrayList<>();
					}
					EventFull ef = new EventFull(e, t.getPrice(), t.getAmountSold(), t.getTotalAmount(), eventImages, typetickets);
					eventsFull.add(ef);
				} else { System.out.println("Typeticket nulo"); }
			}

			eventsFullResponse.setCode(200);
			eventsFullResponse.setEventsFull((ArrayList<EventFull>) eventsFull);
		} catch(Exception e) {
			eventsFullResponse.setCode(500);
			e.printStackTrace();
		}
		return eventsFullResponse;
	}

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody BasicResponse createEvent(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		BasicResponse bar = new BasicResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
            Promotor promotor = pr.findByUser(u);
			if(promotor != null) {
				Building building = brr.findOne(Long.parseLong(payload.get("building").toString()));
				Promotor promotorEmpresa = building.getCompany().getPromotor();
				if(promotorEmpresa.getUser().getId() == u.getId()) {
					Event e = new Event();
					e.setName(payload.get("name").toString());
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
				    Date parsedDate = dateFormat.parse(payload.get("date").toString());
				    Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
					e.setDate(timestamp);
					e.setBuilding(building);
					e.setDateToString(payload.get("date").toString());
					
					
					List<String> images = new ArrayList<>();
					try {
						 images = (List<String>) payload.get("images");
					} catch(Exception ex) {}
					if(images == null) throw new java.lang.NullPointerException();
					
					Event eNuevo = err.save(e);
					
					int index = 0;
					String pathMainImage = "";
					for(String image: images) {
						EventImages ei = new EventImages();
						
						String imageName = System.currentTimeMillis()+"_"+(index) + "_" + eNuevo.getId() + ".png";
						String imageSplitted = image.split(",")[1];
						Path path = Paths.get("src/main/resources/images/event/" + imageName);
						Utils.decoder(imageSplitted, path);

						ei.setEvent(eNuevo);
						ei.setImage(imageName);
						eventImagesRepository.save(ei);
						if(index == 0) pathMainImage = imageName;
						index++;
					}		

					eNuevo.setImagePdf(pathMainImage);
					err.save(eNuevo);
					
					bar.setCode(200);
					bar.setMessage("Evento añadido correctamente");
				} else {
					bar.setCode(403);
					bar.setMessage("No es promotor de esa empresa"); 
				}
			} else {
				bar.setCode(403);
				bar.setMessage("No eres promotor");
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			bar.setCode(500);
			bar.setMessage("error");
		}
		
		return bar;
	}
	
	@RequestMapping(path="getEventsByBuilding/{idBuilding}", method = RequestMethod.GET)
	public @ResponseBody EventsResponse getEventsByBuilding(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idBuilding") Long idBuilding) {
		EventsResponse ever = new EventsResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
            Promotor promotor = pr.findByUser(u);
			if(promotor != null) {
				Building b = brr.findOne(idBuilding);
				ArrayList<Event> events = (ArrayList<Event>) err.findEventsByBuilding(b);
				ever.setCode(200);
				ever.setEvents(events);
			} else {
				ever.setCode(403);
			}
		} catch(Exception e) {
			e.printStackTrace();
			ever.setCode(500);
		}
		return ever;
	}
	
	
	@RequestMapping(path="/{idEvent}", method = RequestMethod.GET)
	public @ResponseBody EventFullResponse read(@PathVariable(value="idEvent") Long idEvent) {
		EventFullResponse ever = new EventFullResponse();
		try {
                    Event e = err.findOne(idEvent);
                    EventFull ef = new EventFull();
                    ef.setEvent(e);
                    ef.setTypetickets((ArrayList<Typeticket>) ttr.findByEvent(e));
                    ever.setCode(200);
                    ever.setEventFull(ef);
		} catch(Exception e) {
                    e.printStackTrace();
                    ever.setCode(500);
		}
		return ever;
	}
}
