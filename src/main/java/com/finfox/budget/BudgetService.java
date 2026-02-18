package com.finfox.budget;

import com.finfox.budget.dto.BudgetRequest;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Budget createBudget(BudgetRequest request) {
        User user = getCurrentUser();
        Budget budget = new Budget();
        budget.setUserId(user.getId());
        budget.setCategory(request.getCategory());
        budget.setLimit(request.getLimit());
        budget.setPeriod(request.getPeriod());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        
        return budgetRepository.save(budget);
    }
    
    public List<Budget> getUserBudgets() {
        User user = getCurrentUser();
        return budgetRepository.findByUserId(user.getId());
    }

    public void deleteBudget(String id) {
        User user = getCurrentUser();
        Budget budget = budgetRepository.findById(id)
                .filter(b -> b.getUserId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Budget not found or access denied"));
        budgetRepository.delete(budget);
    }
}
