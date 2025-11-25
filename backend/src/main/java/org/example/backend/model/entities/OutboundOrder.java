package org.example.backend.model.entities;

import lombok.With;
import org.example.backend.utils.enums.Status;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

/**
 * Warenausgang / Lieferung
 */
@With
public record OutboundOrder(
        @Id String id,
        Customer customer,
        int items,
        LocalDateTime outDate,
        Status status,
        Product product
        ) {
}
