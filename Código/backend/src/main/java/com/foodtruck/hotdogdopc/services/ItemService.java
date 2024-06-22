package com.foodtruck.hotdogdopc.services;

import com.foodtruck.hotdogdopc.models.Item;
import com.foodtruck.hotdogdopc.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.foodtruck.hotdogdopc.utils.ObjectUtils.setIfNotNull;

@Service
public class ItemService {
  @Autowired private ItemRepository repository;

  public List<Item> getAll() {
    List<Item> v_listToRetun = repository.returnAllItemsWithoutZeroQuantity();
    return v_listToRetun;
  }

  public Item insert(Item item) {
    return repository.save(item);
  }

  public void delete(Long id) {
     repository.deleteById(id);
  }

  public Item update(Long id, Item item) {
    Optional<Item> optionalItem = repository.findById(id);
    if (optionalItem.isEmpty()) {
      return null;
    }
    Item itemToUpdate = optionalItem.get();
    setIfNotNull(itemToUpdate::setTitle, item.getTitle());
    setIfNotNull(itemToUpdate::setDescription, item.getDescription());
    setIfNotNull(itemToUpdate::setImage, item.getImage());
    setIfNotNull(itemToUpdate::setQuantity, item.getQuantity());
    setIfNotNull(itemToUpdate::setPrice, item.getPrice());
    setIfNotNull(itemToUpdate::setType, item.getType());
    return repository.save(itemToUpdate);
  }
}
