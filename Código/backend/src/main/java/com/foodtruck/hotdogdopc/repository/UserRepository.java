package com.foodtruck.hotdogdopc.repository;

import com.foodtruck.hotdogdopc.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(Long phoneNumber);
    boolean existsByCpf(Long cpf);
    Optional<User> findByEmailAndPassword(String email, String password);
}
