package com.foodtruck.hotdogdopc.models;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

import static java.util.stream.Collectors.toMap;

public enum ItemType {
  BEBIDAS("Bebidas"),
  SALGADOS("Salgados"),
  MACARRAO_NA_CHAPA("Macarrão na Chapa"),
  DOCES("Doces"),
  CACHORRO_QUENTES("Cachorro Quentes"),
  ACOMPANHAMENTOS("Acompanhamentos");

  private final String name;

  ItemType(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public static Map<ItemType, String> getNameByItemType() {
    return Arrays.stream(ItemType.values()).collect(toMap(Function.identity(), ItemType::getName));
  }
}
