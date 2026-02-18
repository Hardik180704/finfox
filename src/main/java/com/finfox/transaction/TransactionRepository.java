package com.finfox.transaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    Page<Transaction> findByUserId(String userId, Pageable pageable);
    
    List<Transaction> findByUserIdAndDateBetween(String userId, LocalDate startDate, LocalDate endDate);
    
    @Query("{ 'userId': ?0, 'category': ?1 }")
    List<Transaction> findByUserIdAndCategory(String userId, String category);
    
    List<Transaction> findByUserIdAndIsAnomalousTrue(String userId);

     @Query(value = "{ 'userId': ?0 }", sort = "{ 'date': -1 }")
    List<Transaction> findAllByUserId(String userId);
}
