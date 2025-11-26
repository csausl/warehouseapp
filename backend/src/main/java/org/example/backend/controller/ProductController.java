package org.example.backend.controller;

import org.example.backend.model.dto.NewProductDTO;
import org.example.backend.model.entities.Product;
import org.example.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api")
public class ProductController {



    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/example")
    public String example(){
        return """
                {"greeting":"hello chris"}
                """;
    }

    @PostMapping("/product")
    public Product addProduct(@RequestBody NewProductDTO newProduct) {
        System.out.println(newProduct );

        return productService.addProduct(newProduct);
    }
}
