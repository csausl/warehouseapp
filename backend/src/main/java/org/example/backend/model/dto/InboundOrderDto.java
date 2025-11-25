package org.example.backend.model.dto;

import lombok.With;
import org.example.backend.model.entities.Product;
import org.example.backend.model.entities.Supplier;
import org.example.backend.utils.enums.Status;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

/**
 * Wareneingang
 */
@With
public record InboundOrderDto(
        Supplier supplier,
        int items,
        Product product
        ) {
}
