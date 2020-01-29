package com.careberos.Repository;

import com.careberos.Model.Building;
import com.careberos.Model.Company;
import com.careberos.Model.Event;
import com.careberos.Model.Rrpp;
import com.careberos.Model.RrppBuilding;
import com.careberos.Model.SellsDate;
import com.careberos.Model.SellsDates;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RrppBuildingRepository extends CrudRepository<RrppBuilding, Long> {
	Iterable<RrppBuilding> findByBuilding(Building building);
    Iterable<RrppBuilding> findByBuildingAndActive(Building building, boolean active);
    Iterable<RrppBuilding> findByRrpp(Rrpp rrpp);
    RrppBuilding findByRrppAndBuilding(Rrpp rrpp, Building building);
    
    @Query("select distinct c from RrppBuilding as rb, Building as b, Company as c where rb.rrpp.id = :idRrpp and rb.building.id = b.id and b.company.id = c.id")
    Iterable<Company> findCompaniesByRrpp(@Param("idRrpp") Long idRrpp);
    
    @Query("select distinct b from RrppBuilding as rb, Building as b, Company as c where rb.rrpp.id = :idRrpp and rb.building.id = b.id and c.id = :idCompany and b.company.id = c.id")
    Iterable<Building> findBuildingsByRrppAndCompany(@Param("idRrpp") Long idRrpp, @Param("idCompany") Long idCompany);
    
    @Query("select distinct b from RrppBuilding as rb, Building as b, Company as c where rb.rrpp.id = :idRrpp and rb.building.id = b.id and b.company.id = c.id")
    Iterable<Building> findBuildingsByRrpp(@Param("idRrpp") Long idRrpp);
     
    @Query("select distinct e from RrppBuilding as rb, Building as b, Event as e where rb.rrpp.id = :idRrpp and rb.building.id = b.id and e.building.id = b.id")
    Iterable<Event> findEventsByRrpp(@Param("idRrpp") Long idRrpp);
    
    @Query("select distinct e from RrppBuilding as rb, Building as b, Event as e where rb.rrpp.id = :idRrpp and b.id = :idBuilding and rb.building.id = b.id and e.building.id = b.id and e.date BETWEEN NOW() AND e.finishDate")
    Iterable<Event> findNotPassedEventsByRrppAndBuilding(@Param("idRrpp") Long idRrpp, @Param("idBuilding") Long idBuilding);
    
    @Query("select new com.careberos.Model.SellsDate(t.dateString, count(t)) from Ticket as t where t.rrppSeller.id = :idRrpp and t.soldDate between :dateBegin and :dateEnd group by t.dateString")
    List<SellsDate> getTicketsSoldByRrpp(@Param("idRrpp") Long idRrpp, @Param("dateBegin") java.sql.Date dateBegin,  @Param("dateEnd") java.sql.Date dateEnd);
    
    @Query("select new com.careberos.Model.SellsDate(t.dateString, count(t)) from Ticket as t where t.typeticket.event.id = :idEvent and t.rrppSeller.id = :idRrpp and t.soldDate between :dateBegin and :dateEnd group by t.dateString")
    List<SellsDate> getTicketsSoldByRrppAndEvent(@Param("idRrpp") Long idRrpp, @Param("dateBegin") java.sql.Date dateBegin,  @Param("dateEnd") java.sql.Date dateEnd, @Param("idEvent") Long idEvent);
    
}
