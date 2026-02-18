package com.finfox.ai;

import com.finfox.transaction.Transaction;
import com.finfox.transaction.TransactionRepository;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import org.springframework.ai.anthropic.AnthropicChatModel;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiAdvisorService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final AnthropicChatModel chatModel;

    public AiAdvisorService(TransactionRepository transactionRepository, UserRepository userRepository,
                            AnthropicChatModel chatModel) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.chatModel = chatModel;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String getSavingsAdvice() {
        User user = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());

        int size = transactions.size();
        List<Transaction> recent = transactions.subList(Math.max(0, size - 50), size);

        String prompt = """
            Analyze these transactions and provide 3 specific, actionable savings tips.
            Format the output as a JSON array of strings.
            Transactions:
            %s
            """.formatted(recent.toString());

        return chatModel.call(prompt);
    }
}
