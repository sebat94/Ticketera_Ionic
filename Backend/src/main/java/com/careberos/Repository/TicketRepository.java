package com.careberos.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.careberos.Model.Ticket;
import com.careberos.Model.User;
import com.careberos.Model.Rrpp;


public interface TicketRepository extends CrudRepository<Ticket, Long> {
	Iterable<Ticket> findTicketsByUser(User u);
	
	//@Query("SELECT t FROM ticket t LEFT JOIN typeticket tt ON t.typeticket = tt.id left join event e on tt.event.id = e.id left join building b on e.building.id = b.id left join company c on b.company.id = c.id where c.id = :idCompany and t.rrppSeller.id = :idRrpp")
	//Iterable<Ticket> findTicketsSoldByRrppInACompany(@Param("idRrpp") Long idRrpp, @Param("idCompany") Long idCompany);
	
	Iterable<Ticket> findTicketsByRrppSeller(Rrpp rrpp);
	
	@Query("select count(*) from Ticket as t where t.rrppSeller.id = :idRrpp and t.typeticket.id = :idTypeticket")
    int getSoldTicketsByRrpp(@Param("idRrpp") Long idRrpp, @Param("idTypeticket") Long idTypeticket);
}
