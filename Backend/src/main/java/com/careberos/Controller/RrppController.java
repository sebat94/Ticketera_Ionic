package com.careberos.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.Authtoken;
import com.careberos.Model.Rrpp;
import com.careberos.Model.Rrppjefe;
import com.careberos.Model.User;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.RrppJefeRepository;
import com.careberos.Repository.RrppRepository;

@RestController
@RequestMapping(path="/rrpp")
public class RrppController {
	@Autowired
	private RrppRepository rpr;
	
	@Autowired
	private AuthtokenRepository atr;
	
	@Autowired
	private RrppJefeRepository rjr;
	
	@RequestMapping(value="/getMyRrppMasters", method = RequestMethod.GET)
	public @ResponseBody Iterable<Rrpp> getMyRrppMasters(@RequestHeader("Authorization") String authHeader) {
		Iterable<Rrpp> rrpps = null;
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			rrpps = rjr.findByEmployee(rrpp.getId());
		} catch(Exception e) {
			e.printStackTrace();
		}
		return rrpps;
	}
	
	@RequestMapping(value="/getMyRrppEmployees", method = RequestMethod.GET)
	public @ResponseBody Iterable<Rrpp> getMyRrppEmployees(@RequestHeader("Authorization") String authHeader) {
		Iterable<Rrpp> rrpps = null;
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			rrpps = rjr.findByMaster(rrpp.getId());
		} catch(Exception e) {
			e.printStackTrace();
		}
		return rrpps;
	}
	
	@RequestMapping(value="/addRrppEmployee", method = RequestMethod.POST)
	public @ResponseBody String addNewRrppEmployees(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		String respuesta = "";
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrppMaster = rpr.findByUser(u);
			Rrpp rrppEmployee = rpr.findOne(Long.parseLong(payload.get("idRrppEmployee").toString()));
			if(rrppMaster.getId() != rrppEmployee.getId()) {
				Rrppjefe rrppjefe = new Rrppjefe();
				rrppjefe.setActive(false);
				rrppjefe.setMaster(rrppMaster);
				rrppjefe.setEmployee(rrppEmployee);
				rjr.save(rrppjefe);
				respuesta = "Añadido correctamente";
			} else {
				respuesta = "No te puedes añadir a ti mismo";
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		return respuesta;
	}
	
	@RequestMapping(value="/getMyRrppMasterRequests", method = RequestMethod.GET)
	public @ResponseBody Iterable<Rrpp> getMyRrppMasterRequests(@RequestHeader("Authorization") String authHeader) {
		Iterable<Rrpp> rrpps = null;
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			rrpps = rjr.findByEmployeeAndNoActive(rrpp.getId());
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return rrpps;
	}
	
	@RequestMapping(value="/acceptMasterRrppRequest", method = RequestMethod.POST)
	public @ResponseBody String acceptMasterRrppRequest(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		String respuesta = "";
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Rrpp rrpp = rpr.findByUser(u);
			Rrppjefe rrppjefe = rjr.findOne(Long.parseLong(payload.get("rrppjefeid").toString()));
			rrppjefe.setActive(true);
			rjr.save(rrppjefe);
			respuesta = "Activada correctamente";
		} catch(Exception e) {
			e.printStackTrace();
		}
		return respuesta;
	}
	
}
