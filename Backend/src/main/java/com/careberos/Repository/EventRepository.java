package com.careberos.Repository;

import org.springframework.data.repository.CrudRepository;

import com.careberos.Model.Building;
import com.careberos.Model.Event;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface EventRepository extends CrudRepository<Event, Long> {

	Iterable<Event> findEventsByBuilding(Building b);
	
    @Query("select min( price) from Typeticket where fk_typeticket_event = :event ")
    float findMinPrice(@Param("event") Long event);
    
    @Query("select sum(totalAmount - amountSold) from Typeticket where fk_typeticket_event = :event ")
    int findNumTicketsAvailable(@Param("event") Long event);

    @Query("select sum(totalAmount) from Typeticket where fk_typeticket_event = :event ")
    int findNumTicketsTotal(@Param("event") Long event);
    
    @Query("select e from Event as e where e.date >= now()")
    List<Event> findTopNEvents(Pageable pageable);
    
    @Query("select count(e) from Event as e where e.date >= now()")
    int countOfEvents();
    
}
