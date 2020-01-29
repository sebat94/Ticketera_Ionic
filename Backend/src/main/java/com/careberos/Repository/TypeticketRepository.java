package com.careberos.Repository;

import com.careberos.Model.Event;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.careberos.Model.Typeticket;


public interface TypeticketRepository extends CrudRepository<Typeticket, Long> {
    
    Iterable<Typeticket> findByEvent(Event e);
    
    @Query("select t from Typeticket as t where t.event.id = :idEvent and t.price = (select min(t2.price) from Typeticket t2 where t2.event.id = :idEvent)")
    Typeticket findMinPrinceTypeticketByEvent(@Param("idEvent") Long idEvent);
}
