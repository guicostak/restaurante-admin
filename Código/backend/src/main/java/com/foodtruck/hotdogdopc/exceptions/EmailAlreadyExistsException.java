package com.foodtruck.hotdogdopc.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException() {
        super("Email já cadastrado");
    }
}
