package org.example.backend.controller;

import org.example.backend.model.dto.NewProductDTO;
import org.example.backend.model.entities.Product;
import org.example.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {



    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/product")
    public NewProductDTO addProduct(@RequestBody NewProductDTO newProduct) {
        System.out.println(newProduct );
        return newProduct;
    }
}
