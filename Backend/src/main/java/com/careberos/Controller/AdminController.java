package com.careberos.Controller;

import com.careberos.Model.Admin;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.Authtoken;
import com.careberos.Model.Building;
import com.careberos.Model.Company;
import com.careberos.Model.Promotor;
import com.careberos.Model.User;
import com.careberos.Repository.AdminRepository;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.UserRepository;
import com.careberos.Repository.BuildingRepository;
import com.careberos.Repository.CompanyRepository;
import com.careberos.Repository.PromotorRepository;

@RestController
@RequestMapping(path="/backend")
public class AdminController {
	@Autowired
	private UserRepository ur;
        
    @Autowired
    private PromotorRepository pr;
    
    @Autowired
    private AdminRepository ar;
	
	@Autowired
	private AuthtokenRepository atr;
	
	@Autowired
	private CompanyRepository cr;
        
    @Autowired
    private BuildingRepository br;
	
	@RequestMapping(path="addCompanyToPromotor", method = RequestMethod.POST)
	public @ResponseBody String addCompanyToPromotor(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		String respuesta = "";
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
                Admin admin = null;
                admin = ar.findByUser(u);
                if(admin != null) {
				Company company = cr.findOne(Long.parseLong(payload.get("company").toString()));
				User user = ur.findOne(Long.parseLong(payload.get("user").toString()));
                                Promotor promotor = pr.findByUser(user);
				company.setPromotor(promotor);
				cr.save(company);
                                pr.save(promotor);
				respuesta = "Empresa añadida correctamente al promotor";
			} else {
				respuesta = "403. No eres admin";
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			respuesta = "error";
		}
		
		return respuesta;
	}
	
	@RequestMapping(path="/activateBuilding", method = RequestMethod.POST)
	public @ResponseBody String activeCompany(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		String respuesta = "";
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
                        Admin admin = null;
                        admin = ar.findByUser(u);
			if(admin != null) {
				Building b = br.findOne(Long.parseLong(payload.get("building").toString()));
				b.setActive(true);
				br.save(b);
				respuesta = "Empresa activada correctamente";
			} else {
				respuesta = "403. No eres admin";
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			respuesta = "error";
		}
		return respuesta;
	}	
	
}
