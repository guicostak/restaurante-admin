package com.foodtruck.hotdogdopc.vos;

import com.foodtruck.hotdogdopc.models.Item;

public class ItemByOrderRequest {

    private Long id;
    private Integer quantity;

    private Item item;

    public Item getItem() { return item;}

    public void setItem(Item item) { this.item = item;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
