package com.foodtruck.hotdogdopc.mappers;

import com.foodtruck.hotdogdopc.models.ItemByOrder;
import com.foodtruck.hotdogdopc.models.Order;
import com.foodtruck.hotdogdopc.vos.ItemByOrderRequest;
import com.foodtruck.hotdogdopc.vos.OrderRequest;

import java.util.List;

import static org.hibernate.internal.util.collections.CollectionHelper.isNotEmpty;

public final class OrderMapper {
  private OrderMapper() {}

  public static ItemByOrder mapItemByOrder(ItemByOrderRequest source, Order order) {
    ItemByOrder itemByOrder = new ItemByOrder();
    itemByOrder.setItem(source.getItem());
    itemByOrder.setQuantity(source.getQuantity());
    itemByOrder.setOrderAssociated(order);
    return itemByOrder;
  }

  public static List<ItemByOrder> mapItems(OrderRequest orderRequest, Order order) {
    if (isNotEmpty(orderRequest.getSelectedItems())) {
      return orderRequest.getSelectedItems().stream()
          .map(item -> mapItemByOrder(item, order))
          .toList();
    }
    return null;
  }

  public static Order map(OrderRequest source) {
    Order order = new Order();
    order.setNameClient(source.getNameClient());
    order.setPhoneClient(source.getPhoneClient());
    order.setSuggestion(source.getSuggestion());
    order.setStatus(source.getStatus());
    order.setSelectedItems(mapItems(source, order));
    return order;
  }
}
