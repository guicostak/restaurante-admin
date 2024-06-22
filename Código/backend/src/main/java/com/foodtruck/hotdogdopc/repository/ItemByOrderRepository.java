package com.foodtruck.hotdogdopc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.foodtruck.hotdogdopc.models.ItemByOrder;
import java.util.List;


@Repository
public interface ItemByOrderRepository extends JpaRepository<ItemByOrder, Long> { 
    @Query("SELECT i FROM ItemByOrder i WHERE i.reportAssociated IS NULL")
List<ItemByOrder> findOnNotExistingReport();


}
