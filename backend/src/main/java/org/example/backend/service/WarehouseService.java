package org.example.backend.service;

import org.example.backend.repository.WarehouseRepo;
import org.springframework.stereotype.Service;

@Service
public class WarehouseService {
    private final WarehouseRepo warehouseRepo;

    public WarehouseService(WarehouseRepo warehouseRepo) {
        this.warehouseRepo = warehouseRepo;
    }
}
