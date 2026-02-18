package com.finfox.transaction;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "transactions")
public class Transaction {
    @Id
    private String id;
    
    @Indexed
    private String userId;
    
    private LocalDate date;
    private BigDecimal amount;
    private String description;
    
    @Indexed
    private String category;
    
    private String type; // INCOME, EXPENSE
    private String paymentMethod;
    
    private boolean isAnomalous;
    private String anomalyReason;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
