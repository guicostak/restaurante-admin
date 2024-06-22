package com.foodtruck.hotdogdopc.controllers;

import com.foodtruck.hotdogdopc.models.Order;
import com.foodtruck.hotdogdopc.services.OrderService;
import com.foodtruck.hotdogdopc.vos.OrderRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.foodtruck.hotdogdopc.mappers.OrderMapper.map;

@RestController
@RequestMapping("/orders")
@Controller
public class OrderController {

  @Autowired private OrderService service;

  @GetMapping
  public ResponseEntity<List<Order>> getOrders() {
    return ResponseEntity.ok(service.getAll());
  }

  @PostMapping
  public ResponseEntity<Order> postOrder(@Valid @RequestBody OrderRequest order) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.insert(map(order)));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Order> patchOrder(@PathVariable Long id, @RequestBody OrderRequest order) {
    Order updatedOrder = service.update(id, map(order));
    if (updatedOrder == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(updatedOrder);
  }
}
