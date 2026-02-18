package com.finfox.budget.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BudgetRequest {
    @NotNull(message = "Category is required")
    private String category;

    @NotNull(message = "Limit is required")
    @Positive(message = "Limit must be positive")
    private BigDecimal limit;

    @NotNull(message = "Period is required (MONTHLY/WEEKLY)")
    private String period;

    private LocalDate startDate;
    private LocalDate endDate;
}
