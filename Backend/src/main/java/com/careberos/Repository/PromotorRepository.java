package com.careberos.Repository;

import com.careberos.Model.Company;
import com.careberos.Model.Promotor;
import com.careberos.Model.SellsDate;
import com.careberos.Model.User;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;




public interface PromotorRepository extends CrudRepository<Promotor, Long> {
    Promotor findByUser(User user);
    
    @Query("select new com.careberos.Model.SellsDate(t.dateString, count(t)) from Ticket as t where t.typeticket.event.building.id = :idBuilding and t.soldDate between :dateBegin and :dateEnd group by t.dateString")
    List<SellsDate> getTicketsSoldByBuildingAndDate(@Param("dateBegin") java.sql.Date dateBegin,  @Param("dateEnd") java.sql.Date dateEnd, @Param("idBuilding") Long idBuilding);
    
    
}
