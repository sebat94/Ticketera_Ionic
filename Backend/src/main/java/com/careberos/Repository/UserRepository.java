package com.careberos.Repository;

import org.springframework.data.repository.CrudRepository;

import com.careberos.Model.User;


public interface UserRepository extends CrudRepository<User, Long> {
	User findByEmail(String email);
}
