package com.foodtruck.hotdogdopc.controllers;

import com.foodtruck.hotdogdopc.models.Item;
import com.foodtruck.hotdogdopc.models.ItemType;
import com.foodtruck.hotdogdopc.services.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/items")
@Controller
public class ItemController {

  @Autowired private ItemService service;

  @GetMapping
  public ResponseEntity<List<Item>> getItems() {
    return ResponseEntity.ok(service.getAll());
  }

  @PostMapping
  public ResponseEntity<Item> postItem(@Valid @RequestBody Item item) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.insert(item));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Item> patchItem(@PathVariable Long id, @RequestBody Item item) {
    item = service.update(id, item);
    if (item == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(item);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/types")
  public ResponseEntity<Map<ItemType, String>> getTypes() {
    return ResponseEntity.ok(ItemType.getNameByItemType());
  }
}
