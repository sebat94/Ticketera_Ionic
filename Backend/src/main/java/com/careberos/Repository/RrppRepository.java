package com.careberos.Repository;

import com.careberos.Model.Rrpp;
import com.careberos.Model.User;
import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;




public interface RrppRepository extends CrudRepository<Rrpp, Long> {
    
    Rrpp findByUser(User user);
}
