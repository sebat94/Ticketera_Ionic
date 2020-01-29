package com.careberos.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.Authtoken;
import com.careberos.Model.City;
import com.careberos.Model.Building;
import com.careberos.Model.Event;
import com.careberos.Model.Promotor;
import com.careberos.Model.Typeticket;
import com.careberos.Model.User;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.CityRepository;
import com.careberos.Repository.EventRepository;
import com.careberos.Repository.TypeticketRepository;
import com.careberos.Response.BasicResponse;
import com.careberos.Repository.BuildingRepository;
import com.careberos.Repository.PromotorRepository;

@RestController
@RequestMapping(path="/typeticket")
public class TypeticketController {
	@Autowired
	private TypeticketRepository tr;
	
	@Autowired
	private AuthtokenRepository atr;
	
	@Autowired
	private BuildingRepository br;
	
	@Autowired
	private EventRepository er;
        
    @Autowired
    private PromotorRepository pr;
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody BasicResponse addTypeticketToEvent(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		BasicResponse res = new BasicResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
            Promotor promotor = pr.findByUser(u);
			if(promotor != null) {

				Event e = er.findOne(Long.parseLong(payload.get("event").toString()));
				Building building = e.getBuilding();
				if(building.getCompany().getPromotor().getUser().getId() == u.getId()) {
					Typeticket t = new Typeticket();
					t.setTotalAmount(Integer.parseInt(payload.get("totalAmount").toString()));
					t.setEvent(e);
					t.setName(payload.get("name").toString());
					t.setAmountSold(0);
					t.setPrice(Float.parseFloat(payload.get("price").toString()));
					tr.save(t);
					res.setMessage("Tipo de ticket nuevo añadido correctamente");
					res.setCode(200);
				} else {
					res.setMessage("No es promotor de esa empresa");
					res.setCode(403);
				}
			} else {
				res.setMessage("No es promotor de esa empresa");
				res.setCode(403);
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			res.setMessage("error");
			res.setCode(500);
		}
	
		return res;
	}
}
