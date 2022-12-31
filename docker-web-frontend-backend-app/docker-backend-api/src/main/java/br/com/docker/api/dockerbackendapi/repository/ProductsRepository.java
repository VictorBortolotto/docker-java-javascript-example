package br.com.docker.api.dockerbackendapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.docker.api.dockerbackendapi.model.Product;

@Repository
public interface ProductsRepository  extends JpaRepository<Product, Long>{
    
    Product findProductById(@Param("id") long id);

}
