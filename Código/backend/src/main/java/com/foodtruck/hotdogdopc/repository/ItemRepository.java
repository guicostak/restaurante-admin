package com.foodtruck.hotdogdopc.repository;

import com.foodtruck.hotdogdopc.models.Item;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT i FROM Item i WHERE i.quantity > 0")
    List<Item> returnAllItemsWithoutZeroQuantity();
}
