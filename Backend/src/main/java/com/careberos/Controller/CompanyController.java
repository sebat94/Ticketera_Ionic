package com.careberos.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.Authtoken;
import com.careberos.Model.Building;
import com.careberos.Model.City;
import com.careberos.Model.Company;
import com.careberos.Model.Promotor;
import com.careberos.Model.Rrpp;
import com.careberos.Model.RrppBuilding;
import com.careberos.Model.User;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.BuildingRepository;
import com.careberos.Repository.CityRepository;
import com.careberos.Repository.CompanyRepository;
import com.careberos.Repository.PromotorRepository;
import com.careberos.Repository.RrppBuildingRepository;
import com.careberos.Repository.RrppRepository;
import com.careberos.Response.BasicResponse;
import com.careberos.Response.BuildingsResponse;
import com.careberos.Response.CompaniesReponse;
import com.careberos.Response.RrppsResponse;

import com.careberos.Response.RrppsResponse;

@RestController
@RequestMapping(path="/company")
public class CompanyController {
	@Autowired
	private CompanyRepository cr;
	
	@Autowired
	private BuildingRepository br;
	
	@Autowired
	private RrppRepository rrp;
	
	@Autowired
	private AuthtokenRepository atr;
	
	@Autowired
	private RrppBuildingRepository rrppbr;
	
	@Autowired
	private PromotorRepository pr;
	
	
	@RequestMapping(value="/{idCompany}/rrpp/{option}", method = RequestMethod.GET)
	public @ResponseBody RrppsResponse getAllRrppByCompany(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idCompany") String idCompany, @PathVariable(value="option") String option) {
		RrppsResponse resp = new RrppsResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Company c = cr.findOne(Long.parseLong(idCompany));
			if(c.getPromotor().getUser().getId() == u.getId()) {
				ArrayList<Building> listaBuildings = (ArrayList<Building>) br.findByCompany(c);
				List<Rrpp> rrpps = new ArrayList<Rrpp>();
				for(Building b: listaBuildings) {
					Iterable<RrppBuilding> rb = new ArrayList<>();
					if(option.equals("active")) {
						rb = rrppbr.findByBuildingAndActive(b, true);
					} else if(option.equals("notactive")) {
						rb = rrppbr.findByBuildingAndActive(b, false);
					} else {
						rb = rrppbr.findByBuilding(b);
					}
					
					for(RrppBuilding item: rb) {
						rrpps.add(item.getRrpp());
					}
				}

				resp.setRrpps(rrpps);
			} else {
				resp.setCode(403);
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			resp.setCode(500);
		}
		return resp;
	}
	
	@RequestMapping(path="/createCompany", method = RequestMethod.POST)
	public @ResponseBody BasicResponse createCompany(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		BasicResponse br = new BasicResponse();
		
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Promotor p = null;
			try {
				p = pr.findByUser(u);
			} catch(Exception e) { 
				br.setMessage("No eres promotor");
				br.setCode(403);
			}
						
			if(p != null){
				Company c = new Company();
				c.setCIF(payload.get("cif").toString());
				c.setName(payload.get("name").toString());
				c.setPromotor(p);
				c.setActive(false);
				cr.save(c);
				br.setCode(200);
				br.setMessage("Empresa creada correctamente. En las próximas 48 nos pondremos en contacto con usted.");
			}
			
		} catch(Exception e) {
			e.printStackTrace();
			br.setCode(500);
			br.setMessage("Algo ha fallado en el proceso");
		}
		return br;
	}
	
	@RequestMapping(path="/listCompanies", method = RequestMethod.GET)
	public @ResponseBody CompaniesReponse listCompanies(@RequestHeader("Authorization") String authHeader) {
		CompaniesReponse com = new CompaniesReponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Promotor p = null;
			try {
				p = pr.findByUser(u);
			} catch(Exception e) { 
				com.setCode(403);
			}
						
			if(p != null){
				com.setCode(200);
				com.setCompanies((ArrayList<Company>) cr.findByPromotor(p));
			}
		} catch(Exception e) {
			e.printStackTrace();
			com.setCode(500);
		}
		return com;
	}
	
	@RequestMapping(path="{idCompany}/getBuildings", method = RequestMethod.GET)
	public @ResponseBody BuildingsResponse listCompanies(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idCompany") Long idCompany) {
		BuildingsResponse bre = new BuildingsResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Promotor p = null;
			try {
				p = pr.findByUser(u);
			} catch(Exception e) { 
				bre.setCode(403);
			}
						
			if(p != null){
				bre.setCode(200);
				bre.setBuildings((ArrayList<Building>) br.findByCompany(cr.findOne(idCompany)));
			}
		} catch(Exception e) {
			e.printStackTrace();
			bre.setCode(500);
		}
		return bre;
	}
	
}
