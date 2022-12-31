package br.com.docker.api.dockerbackendapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", length = 400, nullable = false)
    private String productName;

    @Column(name = "description", length = 400, nullable = false)
    private String productDescription;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "color", length = 400, nullable = true)
    private String color;

    @Column(name = "length", nullable = true)
    private double productLength;

    @Column(name = "scale", length = 3, nullable = true)
    private String productScale;

    public Product() {
    }

    public Product(String productName, String productDescription, Double price, String color, double productLength,
            String productScale) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.price = price;
        this.color = color;
        this.productLength = productLength;
        this.productScale = productScale;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getProductLength() {
        return productLength;
    }

    public void setProductLength(double productLength) {
        this.productLength = productLength;
    }

    public String getProductScale() {
        return productScale;
    }

    public void setProductScale(String productScale) {
        this.productScale = productScale;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((productName == null) ? 0 : productName.hashCode());
        result = prime * result + ((productDescription == null) ? 0 : productDescription.hashCode());
        result = prime * result + ((price == null) ? 0 : price.hashCode());
        result = prime * result + ((color == null) ? 0 : color.hashCode());
        long temp;
        temp = Double.doubleToLongBits(productLength);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((productScale == null) ? 0 : productScale.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Product other = (Product) obj;
        if (id != other.id)
            return false;
        if (productName == null) {
            if (other.productName != null)
                return false;
        } else if (!productName.equals(other.productName))
            return false;
        if (productDescription == null) {
            if (other.productDescription != null)
                return false;
        } else if (!productDescription.equals(other.productDescription))
            return false;
        if (price == null) {
            if (other.price != null)
                return false;
        } else if (!price.equals(other.price))
            return false;
        if (color == null) {
            if (other.color != null)
                return false;
        } else if (!color.equals(other.color))
            return false;
        if (Double.doubleToLongBits(productLength) != Double.doubleToLongBits(other.productLength))
            return false;
        if (productScale == null) {
            if (other.productScale != null)
                return false;
        } else if (!productScale.equals(other.productScale))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", productName=" + productName + ", productDescription=" + productDescription
                + ", price=" + price + ", color=" + color + ", productLength=" + productLength + ", productScale="
                + productScale + "]";
    }

    
}
