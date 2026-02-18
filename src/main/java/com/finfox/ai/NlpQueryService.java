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
public class NlpQueryService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ChatClient.Builder chatClientBuilder;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String processQuery(String query) {
        User user = getCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());

        // For a hackathon/MVP, we can inject recent transactions directly into context
        // instead of setting up a full Vector Store pipeline which requires Atlas setup.
        // This validates the RAG concept: Retrieval (Database) -> Augmented (Prompt) -> Generation (LLM).
        
        String prompt = """
            Answer the user's question based strictly on the provided transaction history.
            If the answer cannot be found in the data, say "I don't have enough information."
            
            User Question: %s
            
            Transaction History:
            %s
            """.formatted(query, transactions.toString());

        return chatClientBuilder.build().prompt().user(prompt).call().content();
    }
}
