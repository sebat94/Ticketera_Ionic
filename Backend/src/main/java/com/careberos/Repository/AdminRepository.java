package com.careberos.Repository;

import com.careberos.Model.Admin;
import org.springframework.data.repository.CrudRepository;

import com.careberos.Model.User;


public interface AdminRepository extends CrudRepository<Admin, Long> {
	Admin findByUser(User user);
}
