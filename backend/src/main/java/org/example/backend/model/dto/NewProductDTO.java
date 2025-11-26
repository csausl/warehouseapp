package org.example.backend.model.dto;

import lombok.With;
import org.example.backend.utils.enums.Category;

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
