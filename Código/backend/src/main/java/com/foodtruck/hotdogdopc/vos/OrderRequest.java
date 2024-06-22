package com.foodtruck.hotdogdopc.vos;

import com.foodtruck.hotdogdopc.models.OrderStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class OrderRequest {
    @NotNull
    private String nameClient;

    @NotNull
    private Long phoneClient;

    @NotEmpty
    private List<ItemByOrderRequest> selectedItems;

    private String suggestion;

    private OrderStatus status = OrderStatus.PEDIDO;

    public String getNameClient() {
        return nameClient;
    }

    public void setNameClient(String nameClient) { this.nameClient = nameClient; }

    public Long getPhoneClient() { return phoneClient; }

    public void setPhoneClient(Long phoneClient) { this.phoneClient = phoneClient; }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }

    public List<ItemByOrderRequest> getSelectedItems() {
        return selectedItems;
    }

    public void setSelectedItems(List<ItemByOrderRequest> selectedItems) {
        this.selectedItems = selectedItems;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
