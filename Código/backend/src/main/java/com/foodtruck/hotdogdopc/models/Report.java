package com.foodtruck.hotdogdopc.models;

import org.hibernate.annotations.Fetch;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import static jakarta.persistence.GenerationType.IDENTITY;
import static org.hibernate.annotations.FetchMode.SELECT;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idItem", unique = true)
    @Fetch(SELECT)
    private Item itemAssociatied;

    private Integer quantity;

    private double valorTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Item getItemAssociatied() {
        return itemAssociatied;
    }

    public void setItemAssociatied(Item itemAssociatied) {
        this.itemAssociatied = itemAssociatied;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void addQuantity(Integer quantity) {
        this.quantity += quantity;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public void addValorTotal(double valorParaAdicionar) {
        this.valorTotal += valorParaAdicionar;
    }
    
}
