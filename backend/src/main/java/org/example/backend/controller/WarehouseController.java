package org.example.backend.controller;

import org.example.backend.repository.WarehouseRepo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WarehouseController {

    private final WarehouseRepo warehouseRepo;

    public WarehouseController(WarehouseRepo warehouseRepo) {
        this.warehouseRepo = warehouseRepo;
    }
}
