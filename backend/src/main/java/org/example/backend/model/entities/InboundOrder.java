package org.example.backend.model.entities;

import lombok.Builder;
import lombok.With;
import org.example.backend.utils.enums.Status;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

/**
 * Wareneingang
 */
@With
@Builder
public record InboundOrder(
        @Id String id,
        String supplierId,
        int items,
        LocalDateTime inDate,
        Status status,
        String productId
) {
}
