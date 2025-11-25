package org.example.backend.repository;

import org.example.backend.model.entities.InboundOrder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InboundOrderRepo extends MongoRepository<InboundOrder,String> {
}
