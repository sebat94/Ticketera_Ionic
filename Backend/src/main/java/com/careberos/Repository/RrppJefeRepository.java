package com.careberos.Repository;

import com.careberos.Model.Rrpp;
import com.careberos.Model.Rrppjefe;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RrppJefeRepository extends CrudRepository<Rrppjefe, Long> {
	@Query("select rj.master from Rrppjefe as rj where rj.employee.id = :idRrpp")
    Iterable<Rrpp> findByEmployee(@Param("idRrpp") Long idRrpp);
	
	@Query("select rj.employee from Rrppjefe as rj where rj.master.id = :idRrpp")
    Iterable<Rrpp> findByMaster(@Param("idRrpp") Long idRrpp);
	
	@Query("select rj.master from Rrppjefe as rj where rj.employee.id = :idRrpp and rj.active = false")
    Iterable<Rrpp> findByEmployeeAndNoActive(@Param("idRrpp") Long idRrpp);
}
