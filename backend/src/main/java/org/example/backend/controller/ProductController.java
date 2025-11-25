package org.example.backend.controller;

import org.example.backend.model.entities.Product;
import org.example.backend.service.ProductService;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {



    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
}
