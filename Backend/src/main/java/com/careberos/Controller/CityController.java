package com.careberos.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.City;
import com.careberos.Repository.CityRepository;

@RestController
@RequestMapping(path="/city")
public class CityController {
	@Autowired
	private CityRepository cr;
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Iterable<City> readAll() {
		return cr.findAll();
	}
	
}
