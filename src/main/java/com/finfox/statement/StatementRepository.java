package com.finfox.statement;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface StatementRepository extends MongoRepository<Statement, String> {
    List<Statement> findByUserIdOrderByUploadedAtDesc(String userId);
}
