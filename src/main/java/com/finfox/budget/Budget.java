package com.finfox.budget;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Document(collection = "budgets")
public class Budget {
    @Id
    private String id;
    
    @Indexed
    private String userId;
    
    private String category;
    private BigDecimal limit;
    private String period; // MONTHLY, WEEKLY
    
    private LocalDate startDate;
    private LocalDate endDate;
}
