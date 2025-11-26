package org.example.backend.model.dto;

import lombok.With;
import org.example.backend.utils.enums.Category;
import org.springframework.data.annotation.Id;

/**
 * Produkt/Ware
 */
@With
public record NewProductDTO(
        String name,
        String barcode,
        String description,
        int quantity,
        Category category) {
}
