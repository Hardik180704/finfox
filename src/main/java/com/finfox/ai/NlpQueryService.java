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
public class NlpQueryService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final AnthropicChatModel chatModel;

    public NlpQueryService(TransactionRepository transactionRepository, UserRepository userRepository,
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

    public String processQuery(String query) {
        User user = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());

        String prompt = """
            Answer the user's question based strictly on the provided transaction history.
            If the answer cannot be found in the data, say "I don't have enough information."
            
            User Question: %s
            
            Transaction History:
            %s
            """.formatted(query, transactions.toString());

        return chatModel.call(prompt);
    }
}
