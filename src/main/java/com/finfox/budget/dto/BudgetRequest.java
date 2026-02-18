package com.finfox.budget.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

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

    // Getters and Setters
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getLimit() { return limit; }
    public void setLimit(BigDecimal limit) { this.limit = limit; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}
