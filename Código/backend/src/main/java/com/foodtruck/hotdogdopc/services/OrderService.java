package com.foodtruck.hotdogdopc.services;

import com.foodtruck.hotdogdopc.models.Item;
import com.foodtruck.hotdogdopc.models.ItemByOrder;
import com.foodtruck.hotdogdopc.models.Order;
import com.foodtruck.hotdogdopc.models.OrderStatus;
import com.foodtruck.hotdogdopc.repository.ItemRepository;
import com.foodtruck.hotdogdopc.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.foodtruck.hotdogdopc.utils.ObjectUtils.setIfNotNull;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private ItemRepository itemRepository;

    public List<Order> getAll() {
        List<Order> v_listOfOrders = new ArrayList<Order>();
        v_listOfOrders.addAll(repository.findByStatus(OrderStatus.EM_PREPARO));
        v_listOfOrders.addAll(repository.findByStatus(OrderStatus.PEDIDO));
        v_listOfOrders.addAll(repository.findByStatus(OrderStatus.PRONTO));

        return v_listOfOrders;
    }

    public Order insert(Order order) {
        List<ItemByOrder> selectedItems = order.getSelectedItems();

        List<Item> allItems = itemRepository.findAll();

        for (ItemByOrder selectedItem : selectedItems) {
            Item item = allItems.stream()
                    .filter(i -> i.getId().equals(selectedItem.getItem().getId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Item não encontrado: " + selectedItem.getItem().getId()));

            if (item.getQuantity() < selectedItem.getQuantity()) {
                throw new RuntimeException("A quantidade solicitada do item " + item.getTitle() + " é maior do que a quantidade em estoque.");
            }

            item.setQuantity(item.getQuantity() - selectedItem.getQuantity());
            itemRepository.save(item);
        }

        return repository.save(order);
    }

    public Order update(Long id, Order order) {
        Optional<Order> optionalOrder = repository.findById(id);
        if (optionalOrder.isEmpty()) {
            return null;
        }
        Order orderToUpdate = optionalOrder.get();
        setIfNotNull(orderToUpdate::setStatus, order.getStatus());
        setIfNotNull(orderToUpdate::setNameClient, order.getNameClient());
        setIfNotNull(orderToUpdate::setPhoneClient, order.getPhoneClient());
        setIfNotNull(orderToUpdate::setSuggestion, order.getSuggestion());
        setIfNotNull(orderToUpdate::setSelectedItems, order.getSelectedItems());
        try {
            return repository.save(orderToUpdate);
        } catch (Exception ex) {
            return orderToUpdate;
        }
    }
}
