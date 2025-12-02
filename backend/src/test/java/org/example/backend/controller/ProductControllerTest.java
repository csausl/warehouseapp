package org.example.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void addProduct_shouldReturnProductWithIDAndBarcode_WhenGivenProductDTO() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/warehouse/product")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                      {"name": "testy",
                      "description": "ist testprodukt",
                      "quantity": 0,
                      "category":"ELECTRONICS"}
                      """))
                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                   {  "name": "testy",
                      "description": "ist testprodukt",
                      "quantity": 0,
                      "category":"ELECTRONICS"}
                  """

                ))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.barcode").isNotEmpty());
    }

    @Test
    void example() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/warehouse/example"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Hello World"));
    }
}