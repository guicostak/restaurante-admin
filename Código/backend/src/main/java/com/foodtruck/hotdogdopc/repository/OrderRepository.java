package com.foodtruck.hotdogdopc.repository;

import com.foodtruck.hotdogdopc.models.Order;
import com.foodtruck.hotdogdopc.models.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);
}
