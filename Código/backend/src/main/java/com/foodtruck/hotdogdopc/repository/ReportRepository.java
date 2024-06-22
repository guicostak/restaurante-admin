package com.foodtruck.hotdogdopc.repository;

import com.foodtruck.hotdogdopc.models.Item;
import com.foodtruck.hotdogdopc.models.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ReportRepository extends JpaRepository<Report, Long> { 
    Report findByItemAssociatied(Item itemAssociatied);
}
