package com.foodtruck.hotdogdopc.services;

import com.foodtruck.hotdogdopc.exceptions.CpfAlreadyExistsException;
import com.foodtruck.hotdogdopc.exceptions.EmailAlreadyExistsException;
import com.foodtruck.hotdogdopc.exceptions.PhoneAlreadyExistsException;
import com.foodtruck.hotdogdopc.models.User;
import com.foodtruck.hotdogdopc.repository.UserRepository;
import com.foodtruck.hotdogdopc.vos.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import static com.foodtruck.hotdogdopc.utils.ObjectUtils.setIfNotNull;

@Service
public class UserService {

  @Autowired
  private UserRepository repository;

  public Optional<User> login(Login login) {
    return repository.findByEmailAndPassword(login.getEmail(), login.getPassword());
  }

  public List<User> getAll() {
    return repository.findAll();
  }

  public User insert(User user) {

    verifyUser(user);

    return repository.save(user);
  }

  private void verifyUser(User user) {

    List<Supplier<Boolean>> validators = Arrays.asList(
            () -> repository.existsByEmail(user.getEmail()),
            () -> repository.existsByPhoneNumber(user.getPhoneNumber()),
            () -> repository.existsByCpf(user.getCpf())
    );

    List<Supplier<RuntimeException>> exceptions = Arrays.asList(
            EmailAlreadyExistsException::new,
            PhoneAlreadyExistsException::new,
            CpfAlreadyExistsException::new
    );

    for (var i = 0; i < validators.size(); i++) {

      if (validators.get(i).get()) {
        throw exceptions.get(i).get();
      }
    }
  }

  public User update(Long id, User user) {
    Optional<User> optionalUser = repository.findById(id);
    if (optionalUser.isEmpty()) {
      return null;
    }
    User userToUpdate = optionalUser.get();
    setIfNotNull(userToUpdate::setCpf, user.getCpf());
    setIfNotNull(userToUpdate::setEmail, user.getEmail());
    setIfNotNull(userToUpdate::setName, user.getName());
    setIfNotNull(userToUpdate::setPhoneNumber, user.getPhoneNumber());
    return repository.save(userToUpdate);
  }
}
