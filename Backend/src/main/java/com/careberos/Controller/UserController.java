package com.careberos.Controller;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Controller.Utils.Utils;
import com.careberos.Model.Admin;
import com.careberos.Model.Authtoken;
import com.careberos.Model.Promotor;
import com.careberos.Model.Rrpp;
import com.careberos.Model.User;
import com.careberos.Model.Utils.Gender;
import com.careberos.Model.Utils.Rol;
import com.careberos.Repository.AdminRepository;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.PromotorRepository;
import com.careberos.Repository.RrppRepository;
import com.careberos.Repository.UserRepository;
import com.careberos.Response.BasicResponse;
import com.careberos.Response.LoginResponse;
import com.careberos.Response.UserResponse;

@RestController
@RequestMapping(path="/user")
public class UserController {
	@Autowired
	private AdminRepository ar;
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private AuthtokenRepository atr;
        
    @Autowired
    private PromotorRepository pr;
    
    @Autowired
    private RrppRepository rr;

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Iterable<User> readAllEvents() {
		return ur.findAll();
	}
	
	@RequestMapping(path="/{id}", method = RequestMethod.GET)
	public @ResponseBody User readUser(@PathVariable(value="id") String id) {
		
		return ur.findOne(Long.parseLong(id));
	}
	
	@RequestMapping(path="/register", method = RequestMethod.POST)
	public @ResponseBody BasicResponse register(@RequestBody Map<String, Object> payload) {
		ArrayList<User> users = (ArrayList<User>) ur.findAll();
		BasicResponse basicResponse = new BasicResponse();
		int length = users.size();
		boolean encontrado = false;
		for(int i = 0; i < length && !encontrado; i++) {
			if(users.get(i).getEmail().equals(payload.get("email").toString())) {
				encontrado = true;
			}
		}
		
		if(encontrado) {
			basicResponse.setCode(500);
			basicResponse.setMessage("El email está repetido.");
		} else {
			User u = new User();
			u.setEmail(payload.get("email").toString());
			String hashedPasswordBcrypt = BCrypt.hashpw(payload.get("password").toString(), BCrypt.gensalt(12));
			u.setPassword(hashedPasswordBcrypt);
			u.setActive(true);
			ur.save(u);
			basicResponse.setCode(200);
			basicResponse.setMessage("Registrado correctamente.");
		}
		
		return basicResponse;
	}
	
	@RequestMapping(path="/registerPromotor", method = RequestMethod.POST)
	public @ResponseBody BasicResponse registerPromotor(@RequestBody Map<String, Object> payload) {
		ArrayList<User> users = (ArrayList<User>) ur.findAll();
		BasicResponse basicResponse = new BasicResponse();
		int length = users.size();
		boolean encontrado = false;
		for(int i = 0; i < length && !encontrado; i++) {
			if(users.get(i).getEmail().equals(payload.get("email").toString())) {
				encontrado = true;
			}
		}
		
		if(encontrado) {
			basicResponse.setCode(500);
			basicResponse.setMessage("El email está repetido.");
		} else {
			User u = new User();
			u.setEmail(payload.get("email").toString());
			String hashedPasswordBcrypt = BCrypt.hashpw(payload.get("password").toString(), BCrypt.gensalt(12));
			u.setPassword(hashedPasswordBcrypt);
			Promotor promotor = new Promotor();
                        promotor.setUser(u);
			ur.save(u);
                        pr.save(promotor);
            basicResponse.setCode(200);
			basicResponse.setMessage("Registrado correctamente.");
		}
		
		return basicResponse;
	}
	
	@RequestMapping(path="/registerRRPP", method = RequestMethod.POST)
	public @ResponseBody BasicResponse registerRRPP(@RequestBody Map<String, Object> payload) {
		ArrayList<User> users = (ArrayList<User>) ur.findAll();
		BasicResponse basicResponse = new BasicResponse();
		int length = users.size();
		boolean encontrado = false;
		for(int i = 0; i < length && !encontrado; i++) {
			if(users.get(i).getEmail().equals(payload.get("email").toString())) {
				encontrado = true;
			}
		}
		
		if(encontrado) {
			basicResponse.setCode(500);
			basicResponse.setMessage("El email está repetido.");
		} else {
			User u = new User();
			u.setEmail(payload.get("email").toString());
			String hashedPasswordBcrypt = BCrypt.hashpw(payload.get("password").toString(), BCrypt.gensalt(12));
			u.setPassword(hashedPasswordBcrypt);
			Rrpp rrpp = new Rrpp();
                        rrpp.setUser(u);
			ur.save(u);
                        rr.save(rrpp);
            basicResponse.setCode(200);
			basicResponse.setMessage("Registrado correctamente.");
		}
		
		return basicResponse;
	}
	
	@RequestMapping(path="/login", method = RequestMethod.POST)
	public @ResponseBody LoginResponse login(@RequestBody Map<String, Object> payload) {
		
		LoginResponse lr = new LoginResponse();
		lr.setCode(403);
		try {
            System.out.println("Peticion de login");

            String struser = payload.get("email").toString();
            String cyphpass = payload.get("password").toString();
            
            if (struser == null)    System.out.println("El email es nulo");
            else                    System.out.println("El email es : "+struser);
        	// TODO: aplicar bcrypt y comprobar pw correctamente
            if (cyphpass == null)   System.out.println("El pssword es nulo");
            else                    System.out.println("El passw es : "+cyphpass);
            
    		User u = ur.findByEmail(struser);
            if (struser != null){
            	
            	// VALIDAR SI NO ESTÁ ACTIVO, ENTONCES ACTIVARLO
        		if(!u.isActive()) u.setActive(true);

				if(BCrypt.checkpw(cyphpass, u.getPassword())) {
					// Eliminamos cualquier token anterior del usuario
					atr.deleteByUser(u);
					// Generamos uno nuevo y lo almacenamos
					Authtoken auth = new Authtoken();
					auth.generateToken();
					auth.setUser(u);
					atr.save(auth);
					lr.setCode(200);
					lr.setEmail(u.getEmail());
					lr.setAuthtoken(auth.getToken());
					lr.setId(u.getId());
					System.out.println("El id es : " + lr.getId());
					// Setting rol
					boolean rolSet = false;
					try {
						Promotor p = pr.findByUser(u);
						p.getId();
						lr.setRol(Rol.PROMOTOR.toString());
						rolSet = true;
					} catch(Exception e) {}
					
					if(!rolSet) {
						try {
					    	Rrpp p = rr.findByUser(u);
					    	p.getId();
					    	lr.setRol(Rol.RRPP.toString());
					    	rolSet = true;
					    } catch(Exception e) {}
					}
					
					if(!rolSet) {
						try {
					    	Admin p = ar.findByUser(u);
					    	p.getId();
					    	lr.setRol(Rol.ADMIN.toString());
					    	rolSet = true;
					    } catch(Exception e) {}
					}
					
					if(!rolSet) {
						lr.setRol(Rol.NORMAL.toString());
						rolSet = true;
					}
					
					System.out.println("Rol: " + lr.getRol());
				
				}
            }                         
		} catch(Exception ex) {ex.printStackTrace();}
		return lr;
	}
	
	// Y cuando nos logeemos habrá que comprobar si el usuario existe, y si existe
		// y tiene el campo 'active' a 0, se le pondra el campo a 1
	
	@RequestMapping(path="/registerNAU", method = RequestMethod.POST)
	public @ResponseBody UserResponse registerNotActivatedUser(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		UserResponse usr = new UserResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User rrpp = a.getUser();
			
			ArrayList<Rrpp> rrpps = (ArrayList<Rrpp>) rr.findAll();
			int length = rrpps.size();
			boolean rrppExists = false;
			for(int i = 0; i < length && !rrppExists; i++) {
				if(rrpps.get(i).getUser() == rrpp) {
					rrppExists = true;
				}
			}
			
			if(rrppExists) {
				User u = new User();
				User user = ur.findByEmail(payload.get("email").toString());
	        	if(user == null) {
	    			u.setEmail(payload.get("email").toString());
	    			String hashedPasswordBcrypt = BCrypt.hashpw(payload.get("dni").toString(), BCrypt.gensalt(12));
	    			u.setPassword(hashedPasswordBcrypt);
	    			u.setActive(false);
	    			ur.save(u);
	    			
	    			usr.setCode(200);
		        	usr.setUser(u);
	        	}else {
	        		usr.setCode(403);
	        		usr.setMessage("No tienes permisos para realizar esta operación");
		        	usr.setUser(null);
	        	}
        	}
        		
		} catch(Exception ex) {
			ex.printStackTrace();
			usr.setCode(500);
			usr.setMessage("Error registrando el usuario");
			usr.setUser(null);
		}
		return usr;
	}
	
	@RequestMapping(path="/update", method = RequestMethod.PUT)
	public @ResponseBody UserResponse updatePersonalInfo(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		UserResponse usr = new UserResponse();
		Boolean needToSave = false;
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			
			try {
				String password = payload.get("password").toString();
				String hashedPasswordBcrypt = BCrypt.hashpw(password, BCrypt.gensalt(12));
    			u.setPassword(hashedPasswordBcrypt);
    			needToSave = true;
			} catch(Exception e) {}
        	
			try {
				String name = payload.get("name").toString();
				u.setName(name);
				needToSave = true;
			} catch(Exception e) {}
        	
			try {
				String lastname = payload.get("lastname").toString();
				u.setLastname(lastname);
				needToSave = true;
			} catch(Exception e) {}
			
			try {
				String birthdate = payload.get("birthdate").toString();
    		    u.setBirthdate(birthdate);
    		    needToSave = true;
			} catch(Exception e) {}
			
			try {
				String gender = payload.get("gender").toString().toUpperCase();
				if(gender.equals(Gender.FEMALE.toString())) u.setGender(Gender.FEMALE);
	    		else if(gender.equals(Gender.MALE.toString())) u.setGender(Gender.MALE);
	    		else u.setGender(Gender.OTHER);
				needToSave = true;
			} catch(Exception e) {}
			
			try {
				String imageBase64 = payload.get("image").toString();
				String imageSplitted = imageBase64.split(",")[1];
				Path path = Paths.get("src/main/resources/images/profile/" + u.getId() + ".png");
				Utils.decoder(imageSplitted, path);
				u.setImage(u.getId().toString());
				needToSave = true;
			}catch(Exception e) { }

        	// IMAGEN
        	// Para hacer un cambio de DNI tendrá que ser a través de el soporte de la página
        	if(needToSave) ur.save(u);

    		usr.setCode(200);
        	usr.setUser(u);

		} catch(Exception ex) {
			ex.printStackTrace();
			usr.setCode(500);
			usr.setMessage("error");
			usr.setUser(null);
		}
		return usr;
	}
	
	@RequestMapping(path="/me", method = RequestMethod.GET)
	public @ResponseBody UserResponse updatePersonalInfo(@RequestHeader("Authorization") String authHeader) {
		UserResponse usr = new UserResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			// file to Base64
			//Path pathImageProfile = Paths.get("src/main/resources/images/profile/"+ u.getId() +".png");
			String imageRoute = "src/main/resources/images/profile/"+ u.getId() +".png";
			u.setImage(Utils.encoder(imageRoute));
			
    		usr.setCode(200);
        	usr.setUser(u);

		} catch(Exception ex) {
			ex.printStackTrace();
			usr.setCode(500);
			usr.setMessage("error");
			usr.setUser(null);
		}
		return usr;
	}
	
}
