package br.com.docker.api.dockerbackendapi.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.docker.api.dockerbackendapi.model.Product;
import br.com.docker.api.dockerbackendapi.response.ProductResponses;
import br.com.docker.api.dockerbackendapi.services.ProductsServices;

@RestController
@RequestMapping("/api")
public class ProductsController {

    private ProductsServices productsServices;

    public ProductsController(ProductsServices productsServices){
        this.productsServices = productsServices;
    }

    @GetMapping(path = "/product/{id}")
    public ProductResponses findProductById(@PathVariable("id") long id){
        return productsServices.findProductById(id);
    }

    @GetMapping(path = "/products")
    public ProductResponses findAllProducts(){
        return productsServices.findAllProducts();
    }

    @PostMapping(path = "/product/new", produces = MediaType.APPLICATION_JSON_VALUE, consumes = {"application/json"})
    public ProductResponses createProduct(@RequestBody Product product){
        return productsServices.save(product);
    }

    @PatchMapping(path = "/product/name/{id}")
    public ProductResponses updateProductName(@PathVariable("id") long id, @RequestBody Product product){
        return productsServices.updateProductName(id, product.getProductName());
    }

    @PatchMapping(path = "/product/description/{id}")
    public ProductResponses updateProductDescription(@PathVariable("id") long id, @RequestBody Product product){
        return productsServices.updateProductDescription(id, product.getProductDescription());
    }

    @PatchMapping(path = "/product/price/{id}")
    public ProductResponses updateProductPrice(@PathVariable("id") long id, @RequestBody Product product){
        return productsServices.updateProductPrice(id, product.getPrice());
    }

    @PatchMapping(path = "/product/color/{id}")
    public ProductResponses updateProductColor(@PathVariable("id") long id, @RequestBody Product product){
        return productsServices.updateProductColor(id, product.getColor());
    }

    @PatchMapping(path = "/product/length/{id}")
    public ProductResponses updateProductLength(@PathVariable("id") long id, @RequestBody Product product){
        return productsServices.updateProductLength(id, product.getProductLength());
    }

    @PatchMapping(path = "/product/scale/{id}")
    public ProductResponses updateProductScale(@PathVariable("id") long id, @RequestBody Product product){
        return productsServices.updateProductScale(id, product.getProductScale());
    }
    @PutMapping(path = "/product/update/{id}")
    public ProductResponses updateProduct(@PathVariable("id") long id, @RequestBody Product product){
        return productsServices.updateProduct(id, product);
    }

    @DeleteMapping(path = "/product/delete/{id}")
    public ProductResponses delete(@PathVariable("id") long id){
        return productsServices.deleteProduct(id);
    }

}
