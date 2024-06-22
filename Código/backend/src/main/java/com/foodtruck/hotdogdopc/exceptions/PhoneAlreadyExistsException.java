package com.foodtruck.hotdogdopc.exceptions;

public class PhoneAlreadyExistsException extends RuntimeException {
    public PhoneAlreadyExistsException() {
        super("Telefone já cadastrado");
    }
}