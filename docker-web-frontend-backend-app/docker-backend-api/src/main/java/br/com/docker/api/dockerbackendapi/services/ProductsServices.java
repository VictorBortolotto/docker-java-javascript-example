package br.com.docker.api.dockerbackendapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.docker.api.dockerbackendapi.model.Product;
import br.com.docker.api.dockerbackendapi.repository.ProductsRepository;
import br.com.docker.api.dockerbackendapi.response.ProductResponses;

@Service
@Transactional
public class ProductsServices {
    
    private ProductsRepository productsRepository;

    @Autowired
    public ProductsServices(ProductsRepository productsRepository){
        this.productsRepository = productsRepository;
    }

    public ProductResponses save(Product product){
        Product newProduct = productsRepository.save(product);
        ProductResponses responses = null;

        if(newProduct == null){
            responses = new ProductResponses(500, "Ooops, something goes wrong, we can't create your product!", newProduct);
        }else{
            responses = new ProductResponses(200, "Product created with success!", newProduct);
        }

        return responses;
    }

    public ProductResponses findProductById(long id){
        Product product = productsRepository.findProductById(id);
        ProductResponses response = null;
        if(product == null){
            response = new ProductResponses(404, "Product not found!");
        }else {
            response = new ProductResponses(200, "Product retrieved with success!", product);
        }
        return response;
    }

    public List<Product> findAllProducts(){
        return productsRepository.findAll();
    }

    public ResponseEntity<Product> updateProductName(long id, String newName){
        return productsRepository.findById(id).map(record -> {
            record.setProductName(newName);
            Product product = productsRepository.save(record);
            return ResponseEntity.ok().body(product);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Product> updateProductDescription(long id, String newDescription){
        return productsRepository.findById(id).map(record -> {
            record.setProductDescription(newDescription);
            Product product = productsRepository.save(record);
            return ResponseEntity.ok().body(product);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Product> updateProductLength(long id, Double newLength){
        return productsRepository.findById(id).map(record -> {
            record.setPrice(newLength);
            Product product = productsRepository.save(record);
            return ResponseEntity.ok().body(product);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Product> updateProductColor(long id, String newColor){
        return productsRepository.findById(id).map(record -> {
            record.setColor(newColor);
            Product product = productsRepository.save(record);
            return ResponseEntity.ok().body(product);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Product> updateProductPrice(long id, String newScale){
        return productsRepository.findById(id).map(record -> {
            record.setProductScale(newScale);
            Product product = productsRepository.save(record);
            return ResponseEntity.ok().body(product);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Product> updateProductPrice(long id, Double newPrice){
        return productsRepository.findById(id).map(record -> {
            record.setPrice(newPrice);
            Product product = productsRepository.save(record);
            return ResponseEntity.ok().body(product);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ProductResponses deleteProduct(long id){
        return productsRepository.findById(id).map(record -> {
            productsRepository.deleteById(id);
            return new ProductResponses(200, "Product deleted with success!");
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ResponseEntity<Product> updateProduct(long id, Product product){
        return productsRepository.findById(id).map(record -> {
            record.setProductName(product.getProductName());
            record.setProductDescription(product.getProductDescription());
            record.setPrice(product.getPrice());
            record.setColor(product.getColor());
            record.setProductLength(product.getProductLength());
            record.setProductScale(product.getProductScale());
            Product updatedProduct = productsRepository.save(record);
            return ResponseEntity.ok().body(updatedProduct);
        }).orElse(ResponseEntity.notFound().build());
    }
}   
