package com.ogl.devtest.product;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotEmpty
  @Column(unique = true)
  private String sku;

  @NotNull
  private BigDecimal price;

  @NotNull
  private String description;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getSku() {
    return sku;
  }

  public String getDescription() {
    return description;
  }

  public void setSku(String sku) {
    this.sku = sku;
  }

  public void setDescription(String description) {
    //TODO: Error Handling
    if (description.length() > 255) {
      this.description = description.substring(0, 255);
  }else
  this.description = description;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }
}
