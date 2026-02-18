package com.finfox.analytics;

import com.finfox.transaction.Transaction;
import com.finfox.transaction.TransactionRepository;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnomalyDetectionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ChatClient.Builder chatClientBuilder;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void detectAnomalies() {
        User user = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());

        // 1. Structural/Statistical Anomaly (Z-Score)
        // Simple Z-Score logic: if amount > mean + 3 * std_dev
        Map<String, List<Transaction>> byCategory = transactions.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .collect(Collectors.groupingBy(Transaction::getCategory));

        byCategory.forEach((category, list) -> {
            if (list.size() < 5) return; // Need minimum data points

            double mean = list.stream().mapToDouble(t -> t.getAmount().doubleValue()).average().orElse(0);
            double variance = list.stream().mapToDouble(t -> Math.pow(t.getAmount().doubleValue() - mean, 2)).average().orElse(0);
            double stdDev = Math.sqrt(variance);

            for (Transaction t : list) {
                if (t.getAmount().doubleValue() > mean + 3 * stdDev) {
                    t.setAnomalous(true);
                    t.setAnomalyReason("Statistical Outlier (Z-Score > 3)");
                    transactionRepository.save(t);
                }
            }
        });
        
        // 2. AI Semantic Check (Batch for efficiency)
        // This would involve sending recent large transactions to AI to ask if they look suspicious based on descriptions.
        // Skipping implementation for brevity but structure is here.
    }
}
