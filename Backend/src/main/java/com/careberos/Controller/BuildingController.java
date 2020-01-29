package com.careberos.Controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.Admin;
import com.careberos.Model.Authtoken;
import com.careberos.Model.Building;
import com.careberos.Model.Company;
import com.careberos.Model.Promotor;
import com.careberos.Model.Rrpp;
import com.careberos.Model.RrppBuilding;
import com.careberos.Model.User;
import com.careberos.Repository.AdminRepository;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.BuildingRepository;
import com.careberos.Repository.CityRepository;
import com.careberos.Repository.CompanyRepository;
import com.careberos.Repository.PromotorRepository;
import com.careberos.Repository.RrppBuildingRepository;
import com.careberos.Repository.RrppRepository;
import com.careberos.Repository.UserRepository;
import com.careberos.Response.BasicResponse;
import com.careberos.Response.BuildingsResponse;
import com.careberos.Response.CompaniesReponse;

@RestController
@RequestMapping(path="/building")
public class BuildingController {
	@Autowired
	private BuildingRepository br;

	@Autowired
	private UserRepository ur;
        
        @Autowired
	private RrppRepository rr;
	
	@Autowired
	private CompanyRepository cr;
	
	@Autowired
	private CityRepository cir;
	
	@Autowired
	private AuthtokenRepository atr;
	
	@Autowired
	private PromotorRepository pr;
	
	@Autowired
	private AdminRepository ar;
	
	@Autowired
	private RrppBuildingRepository rbr;

        @RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Iterable<Building> readAllBuildings() {
		return br.findAll();
	}
	
        
	@RequestMapping(path="/addRrppBuilding", method = RequestMethod.POST)
	public @ResponseBody BasicResponse addRrppBuilding(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
            BasicResponse bar = new BasicResponse();
            Promotor promotor = null;
            Building building = null;
            Rrpp rrpp = null;
            
            try{
		String token = authHeader.split(" ")[1];
		Authtoken a = atr.findByToken(token);
		User u = a.getUser();
                promotor = pr.findByUser(u);
                
                building = br.findOne(Long.parseLong(payload.get("building").toString()));
                if (building.getCompany().getPromotor() != promotor){
                    bar.setCode(403);
                    bar.setMessage("No eres promotor de este local");
                }else{
                    User user = null;
                    try{
                        user = ur.findByEmail(payload.get("rrppMail").toString());
                    }catch(Exception e){}
                    
                    if (user == null ){
                        bar.setCode(403);
                        bar.setMessage("Email no valido");
                    }else{
                        try{
                        rrpp = rr.findByUser(user);
                        }catch(Exception e){}
                        
                        if (rrpp == null){
                            bar.setCode(403);
                            bar.setMessage("El usuario no es un Relaiones publicas");
                        }else{
                            RrppBuilding rrppBuilding = null;
                            try{
                            rrppBuilding= rbr.findByRrppAndBuilding(rrpp, building);
                            }catch(Exception e){}
                            
                            if (rrppBuilding == null){
                                rrppBuilding = new RrppBuilding();
                                rrppBuilding.setBuilding(building);
                                rrppBuilding.setRrpp(rrpp);
                                rrppBuilding.setComission(0.01f);
                                rbr.save(rrppBuilding);
                                bar.setCode(200);
                                bar.setMessage("Insertado corretamente");
                            }else{
                                bar.setCode(200);
                                bar.setMessage("El RRPP ya estaba asociado al estableimiento");
                            }
                        }
                    }
                }
            }catch(Exception e){
                bar.setMessage("Invalid data");
                bar.setCode(403);
                
            }
            return bar;
        }
        
        
	@RequestMapping(path="/addBuilding", method = RequestMethod.POST)
	public @ResponseBody BasicResponse addBuilding(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		BasicResponse bar = new BasicResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
                        boolean isPromotor = false;
                        boolean isAdmin = false;
                        Company company = null;
                        
            try{
                company = cr.findOne(Long.parseLong(payload.get("company").toString()));
            }catch(Exception e){
                company = null;
            }
            
            Promotor promotor = null;
            try{
                promotor = pr.findByUser(u);
                if (promotor != null) isPromotor = true;
            }catch(Exception e){}
            try{
                Admin admin = ar.findByUser(u);
                if (admin != null) isAdmin = true;
            }catch(Exception e){}

                        
			if((isAdmin || isPromotor) && company != null) {
                if (isAdmin || (!isAdmin && promotor.getId() == company.getPromotor().getId()) ){
                    Building building = new Building();
                    building.setCompany(company);
                    building.setDireccion(payload.get("address").toString());
                    building.setLat(Float.parseFloat(payload.get("lat").toString()));
                    building.setLon(Float.parseFloat(payload.get("lon").toString()));
                    building.setName(payload.get("name").toString());
                    building.setCity(cir.findOne(Long.parseLong(payload.get("city").toString())));
                    br.save(building);
                    bar.setCode(200);
                    bar.setMessage("Building creado correctamente");
                }else{
                	bar.setCode(403);
                    bar.setMessage("No eres promotor de esta compañia");
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
	
}
