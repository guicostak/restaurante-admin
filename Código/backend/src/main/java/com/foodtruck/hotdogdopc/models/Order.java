package com.foodtruck.hotdogdopc.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Fetch;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;
import static org.hibernate.annotations.FetchMode.JOIN;

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  
  @NotNull private String nameClient;
  
  @NotNull
  private Long phoneClient;

  @OneToMany(mappedBy = "orderAssociated", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @Fetch(JOIN)
  @NotEmpty
  private List<ItemByOrder> selectedItems;

  private String suggestion;

  private OrderStatus status = OrderStatus.PEDIDO;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNameClient() {
    return nameClient;
  }

  public void setNameClient(String nameClient) {
    this.nameClient = nameClient;
  }

  public Long getPhoneClient() {
    return phoneClient;
  }

  public void setPhoneClient(Long phoneClient) {
    this.phoneClient = phoneClient;
  }

  public List<ItemByOrder> getSelectedItems() {
    return selectedItems;
  }

  public void setSelectedItems(List<ItemByOrder> selectedItems) {
    this.selectedItems = selectedItems;
  }

  public String getSuggestion() {
    return suggestion;
  }

  public void setSuggestion(String suggestion) {
    this.suggestion = suggestion;
  }

  public OrderStatus getStatus() {
    return status;
  }

  public void setStatus(OrderStatus status) {
    this.status = status;
  }
}
