package com.careberos.Controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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
@RequestMapping(path="/cdn")
public class CDNController {
	@RequestMapping(value = "/{name}", method = RequestMethod.GET, produces = "image/png")
	public @ResponseBody byte[] getImage(@PathVariable("name") String name) {
		Path path = Paths.get("src/main/resources/images/event/" + name + ".png");
		try {
			return Files.readAllBytes(path);
		} catch(IOException e) {
			System.out.println("Image: " + path.toString() + " not found.");
		}
		return null;
	}
}
