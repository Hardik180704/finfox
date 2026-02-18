package com.finfox.analytics;

import com.finfox.transaction.Transaction;
import com.finfox.transaction.TransactionRepository;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    public AnalyticsService(TransactionRepository transactionRepository, UserRepository userRepository,
                            MongoTemplate mongoTemplate) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Map<String, BigDecimal> getMonthlySpend() {
        User user = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());
        return transactions.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .collect(Collectors.groupingBy(
                        t -> YearMonth.from(t.getDate()).toString(),
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));
    }

    public Map<String, BigDecimal> getCategoryBreakdown() {
        User user = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());
        return transactions.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));
    }
}
