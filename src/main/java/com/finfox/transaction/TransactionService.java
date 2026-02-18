package com.finfox.transaction;

import com.finfox.transaction.dto.TransactionRequest;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Transaction createTransaction(TransactionRequest request) {
        User user = getCurrentUser();
        Transaction transaction = new Transaction();
        transaction.setUserId(user.getId());
        transaction.setDate(request.getDate());
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setPaymentMethod(request.getPaymentMethod());
        transaction.setCreatedAt(LocalDateTime.now());
        transaction.setUpdatedAt(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    public Page<Transaction> getUserTransactions(Pageable pageable) {
        User user = getCurrentUser();
        return transactionRepository.findByUserId(user.getId(), pageable);
    }

    public Transaction getTransaction(String id) {
        User user = getCurrentUser();
        return transactionRepository.findById(id)
                .filter(t -> t.getUserId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Transaction not found or access denied"));
    }

    public void deleteTransaction(String id) {
        User user = getCurrentUser();
        Transaction transaction = transactionRepository.findById(id)
                .filter(t -> t.getUserId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Transaction not found or access denied"));
        transactionRepository.delete(transaction);
    }

    public Transaction updateTransaction(String id, TransactionRequest request) {
        User user = getCurrentUser();
        Transaction transaction = transactionRepository.findById(id)
                .filter(t -> t.getUserId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Transaction not found or access denied"));
        transaction.setDate(request.getDate());
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setPaymentMethod(request.getPaymentMethod());
        transaction.setUpdatedAt(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }
}
