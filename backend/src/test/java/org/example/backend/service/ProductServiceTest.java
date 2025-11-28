package org.example.backend.service;

import org.example.backend.model.dto.NewProductDTO;
import org.example.backend.model.entities.InboundOrder;
import org.example.backend.model.entities.Product;
import org.example.backend.repository.InboundOrderRepo;
import org.example.backend.repository.ProductRepo;
import org.example.backend.repository.SupplierRepo;
import org.example.backend.utils.enums.Category;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class ProductServiceTest {


    @Test
    void addProduct_shouldReturnProductWithIDAndBarcode_WhenGivenProductDTO() {
        //GIVEN
        String fakeId="12345";
        String fakeBarcode="12345";
        Product product =new Product(fakeId,"test",fakeBarcode,"testttst",0, Category.CLOTHING);
        NewProductDTO productDto =new NewProductDTO("test","testttst",0, Category.CLOTHING);
        ProductRepo mockProductRepo=mock(ProductRepo.class);
        InboundOrderRepo mockInboundOrderRepo=mock(InboundOrderRepo.class);
        SupplierRepo mockSupplierRepo=mock(SupplierRepo.class);
        IDService mockIDService=mock(IDService.class);
        BarCodeService mockBarCodeService=mock(BarCodeService.class);
        ProductService productService=new ProductService(mockProductRepo,
                mockInboundOrderRepo,
                mockSupplierRepo,
                mockIDService,
                mockBarCodeService);

       // Optional<Product> response= Optional.of(product);
        when(mockIDService.createId()).thenReturn(fakeId);
        when(mockBarCodeService.createBarCode()).thenReturn(fakeBarcode);
        when(mockProductRepo.save(product)).thenReturn(product);
        //WHEN

        Product actual=productService.addProduct(productDto);
        //THEN
        assertEquals(product,actual);
    }

    @Test
    void createProductFromDTO() {
    }
}