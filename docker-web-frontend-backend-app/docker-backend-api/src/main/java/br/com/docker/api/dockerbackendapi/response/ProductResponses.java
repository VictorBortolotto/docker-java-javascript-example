package br.com.docker.api.dockerbackendapi.response;

import java.util.List;

import br.com.docker.api.dockerbackendapi.model.Product;

public class ProductResponses {

    private long statusCode;
    private String message;
    private Product product;
    private List<Product> productsList;

    public long getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(long statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<Product> getProductsList() {
        return productsList;
    }

    public void setProductsList(List<Product> productsList) {
        this.productsList = productsList;
    }

    public ProductResponses() {
    }

    public ProductResponses(long statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public ProductResponses(long statusCode, String message, Product product) {
        this.statusCode = statusCode;
        this.message = message;
        this.product = product;
    }

    public ProductResponses(long statusCode, String message, List<Product> productsList) {
        this.statusCode = statusCode;
        this.message = message;
        this.productsList = productsList;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (statusCode ^ (statusCode >>> 32));
        result = prime * result + ((message == null) ? 0 : message.hashCode());
        result = prime * result + ((product == null) ? 0 : product.hashCode());
        result = prime * result + ((productsList == null) ? 0 : productsList.hashCode());
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
        ProductResponses other = (ProductResponses) obj;
        if (statusCode != other.statusCode)
            return false;
        if (message == null) {
            if (other.message != null)
                return false;
        } else if (!message.equals(other.message))
            return false;
        if (product == null) {
            if (other.product != null)
                return false;
        } else if (!product.equals(other.product))
            return false;
        if (productsList == null) {
            if (other.productsList != null)
                return false;
        } else if (!productsList.equals(other.productsList))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Responses [statusCode=" + statusCode + ", message=" + message + ", product=" + product
                + ", productsList=" + productsList + "]";
    }

}
