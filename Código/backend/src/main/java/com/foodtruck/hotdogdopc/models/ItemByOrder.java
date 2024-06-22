package com.foodtruck.hotdogdopc.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Fetch;

import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.IDENTITY;
import static org.hibernate.annotations.FetchMode.JOIN;
import static org.hibernate.annotations.FetchMode.SELECT;

@Entity
@Table(name = "items_orders")
public class ItemByOrder {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "idOrders")
  @Fetch(SELECT)
  private Order orderAssociated;

  @ManyToOne(fetch = EAGER)
  @JoinColumn(name = "idItem")
  @Fetch(JOIN)
  private Item itemAssociated;

  @ManyToOne(fetch = EAGER)
  @JoinColumn(name = "idReport")
  @Fetch(JOIN)
  private Report reportAssociated;

  @NotNull private Integer quantity;

  @JsonIgnore
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Item getItem() {
    return itemAssociated;
  }

  public void setItem(Item item) {
    this.itemAssociated = item;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  @JsonIgnore
  public Order getOrderAssociated() {
    return orderAssociated;
  }

  public void setOrderAssociated(Order orderAssociated) {
    this.orderAssociated = orderAssociated;
  }

  @JsonIgnore
  public Report getReportAssociated() {
    return reportAssociated;
  }

  public void setReportAssociated(Report reportAssociated) {
    this.reportAssociated = reportAssociated;
  }
}
