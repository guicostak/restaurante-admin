package com.foodtruck.hotdogdopc.controllers;

import com.foodtruck.hotdogdopc.models.User;
import com.foodtruck.hotdogdopc.services.UserService;
import com.foodtruck.hotdogdopc.vos.Login;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserService service;

  @PostMapping("/login")
  public ResponseEntity<User> login(@Valid @RequestBody Login login) {
    Optional<User> user = service.login(login);
    return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<User>> getUsers() {
    return ResponseEntity.ok(service.getAll());
  }

  @PostMapping
  public ResponseEntity<User> postUser(@Valid @RequestBody User user) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.insert(user));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<User> patchUser(@PathVariable Long id, @Valid @RequestBody User user) {
    user = service.update(id, user);
    if (user == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(user);
  }
}
