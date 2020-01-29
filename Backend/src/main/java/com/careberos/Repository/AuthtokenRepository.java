package com.careberos.Repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.careberos.Model.Authtoken;
import com.careberos.Model.User;


public interface AuthtokenRepository extends CrudRepository<Authtoken, Long> {

	@Transactional
	void deleteByUser(User u);
	
	Authtoken findByToken(String token);
}
