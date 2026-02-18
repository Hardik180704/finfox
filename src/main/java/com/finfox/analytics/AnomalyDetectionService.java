package com.finfox.analytics;

import com.finfox.transaction.Transaction;
import com.finfox.transaction.TransactionRepository;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnomalyDetectionService {

    private static final Logger log = LoggerFactory.getLogger(AnomalyDetectionService.class);

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public AnomalyDetectionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void detectAnomalies() {
        User user = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());

        Map<String, List<Transaction>> byCategory = transactions.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .collect(Collectors.groupingBy(Transaction::getCategory));

        byCategory.forEach((category, list) -> {
            if (list.size() < 5) return;

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
    }
}
