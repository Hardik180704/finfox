package com.finfox.ai;

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

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiAdvisorService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ChatClient.Builder chatClientBuilder;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String getSavingsAdvice() {
        User user = getCurrentUser();
        // Get last 90 days or 50 recent transactions to avoid context limit issues in this demo
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());
        
        // Simplified: just take last 50
        int size = transactions.size();
        List<Transaction> recent = transactions.subList(Math.max(0, size - 50), size);

        String prompt = """
            Analyze these transactions and provide 3 specific, actionable savings tips.
            Format the output as a JSON array of strings.
            Transactions:
            %s
            """.formatted(recent.toString());

        return chatClientBuilder.build().prompt().user(prompt).call().content();
    }
}
