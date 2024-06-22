package com.foodtruck.hotdogdopc.utils;

import java.util.function.Consumer;

public final class ObjectUtils {

  public static <T> void setIfNotNull(Consumer<T> setter, T value) {
    if (value != null) {
      setter.accept(value);
    }
  }
}
