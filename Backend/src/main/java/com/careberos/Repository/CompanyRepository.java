
package com.careberos.Repository;

import com.careberos.Model.Building;
import com.careberos.Model.Company;
import com.careberos.Model.Promotor;
import org.springframework.data.repository.CrudRepository;


public interface CompanyRepository extends CrudRepository<Company, Long> {
    Iterable<Company> findByPromotor(Promotor promotor);
}
