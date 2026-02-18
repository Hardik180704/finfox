package com.finfox.statement;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "statements")
public class Statement {
    @Id
    private String id;
    
    @Indexed
    private String userId;
    
    private String filename;
    private String fileType; // PDF, CSV
    private String status; // PENDING, PROCESSED, FAILED
    private int transactionCount;
    
    private LocalDateTime uploadedAt = LocalDateTime.now();
}
