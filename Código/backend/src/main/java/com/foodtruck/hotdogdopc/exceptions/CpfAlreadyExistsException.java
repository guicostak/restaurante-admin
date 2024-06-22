package com.foodtruck.hotdogdopc.exceptions;

public class CpfAlreadyExistsException extends RuntimeException {
    public CpfAlreadyExistsException() {
        super("CPF já cadastrado");
    }
}