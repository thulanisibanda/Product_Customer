package com.ogl.devtest.customer;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotNull
  private String name;

  private String line_1;

  private String line_2;

  private String line_3;

  private String street;

  private String city;

  private String county;

  private String postcode;

  private float lat;

  private float lon;


  public String getLine_1() {
    return line_1;
  }

  public String getLine_2() {
    return line_2;
  }

  public String getLine_3() {
    return line_3;
  }

  public String getCity() {
    return city;
  }
  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public String getCounty() {
    return county;
  }

  public String getPostcode() {
    return postcode;
  }

  public String getStreet() {
    return street;
  }

  public float getLat() {
    return lat;
  }

  public float getLon() {
    return lon;
  }

  public void setName(String name) {
    this.name = name;
  }
  public void setLine_1(String line_1) {
    this.line_1 = line_1;
  }

  public void setLine_2(String line_2) {
    this.line_2 = line_2;
  }

  public void setLine_3(String line_3) {
    this.line_3 = line_3;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public void setCounty(String county) {
    this.county = county;
  }

  public void setPostCode(String postcode) {
    this.postcode = postcode;
  }

  public void setLat(String lat) {
    this.lat = Float.parseFloat(lat);
  }

  public void setLon(String lon) {
    this.lon = Float.parseFloat(lon);
  }
}
