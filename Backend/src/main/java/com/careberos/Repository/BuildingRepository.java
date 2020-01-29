package com.careberos.Repository;

import org.springframework.data.repository.CrudRepository;

import com.careberos.Model.Building;
import com.careberos.Model.Company;


public interface BuildingRepository extends CrudRepository<Building, Long> {
    Iterable<Building> findByCompany(Company company);
}
