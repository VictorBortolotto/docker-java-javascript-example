package br.com.docker.api.dockerbackendapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    public ProductResponses findAllProducts(){
        List<Product> productsList = productsRepository.findAll();
        ProductResponses response = null;

        if(productsList != null && !productsList.isEmpty()){
            response = new ProductResponses(200, "Products retrivied with success!", productsList);
        }else {
            response = new ProductResponses(404, "There's no products to retrieve!");
        }

        return response;
    }

    public ProductResponses updateName(long id, String newName){
        return productsRepository.findById(id).map(record -> {
            record.setName(newName);
            Product product = productsRepository.save(record);
            return new ProductResponses(200, "Product updated with success!", product);
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ProductResponses updateDescription(long id, String newDescription){
        return productsRepository.findById(id).map(record -> {
            record.setDescription(newDescription);
            Product product = productsRepository.save(record);
            return new ProductResponses(200, "Product updated with success!", product);
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ProductResponses updateLength(long id, Double newLength){
        return productsRepository.findById(id).map(record -> {
            record.setLength(newLength);
            Product product = productsRepository.save(record);
            return new ProductResponses(200, "Product updated with success!", product);
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ProductResponses updateColor(long id, String newColor){
        return productsRepository.findById(id).map(record -> {
            record.setColor(newColor);
            Product product = productsRepository.save(record);
            return new ProductResponses(200, "Product updated with success!", product);
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ProductResponses updateScale(long id, String newScale){
        return productsRepository.findById(id).map(record -> {
            record.setScale(newScale);
            Product product = productsRepository.save(record);
            return new ProductResponses(200, "Product updated with success!", product);
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ProductResponses updatePrice(long id, Double newPrice){
        return productsRepository.findById(id).map(record -> {
            record.setPrice(newPrice);
            Product product = productsRepository.save(record);
            return new ProductResponses(200, "Product updated with success!", product);
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ProductResponses deleteProduct(long id){
        return productsRepository.findById(id).map(record -> {
            productsRepository.deleteById(id);
            return new ProductResponses(200, "Product deleted with success!");
        }).orElse(new ProductResponses(404, "Product not found!"));
    }

    public ProductResponses updateProduct(long id, Product product){
        return productsRepository.findById(id).map(record -> {
            record.setName(product.getName());
            record.setDescription(product.getDescription());
            record.setPrice(product.getPrice());
            record.setColor(product.getColor());
            record.setLength(product.getLength());
            record.setScale(product.getScale());
            Product updatedProduct = productsRepository.save(record);
            return new ProductResponses(200, "Product, updated with success!", updatedProduct);
        }).orElse(new ProductResponses(404, "Product not found!"));
    }
}   
