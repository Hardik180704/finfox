package com.finfox.statement;

import com.finfox.statement.parser.StatementParser;
import com.finfox.transaction.TransactionService;
import com.finfox.transaction.dto.TransactionRequest;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatementService {

    private final StatementRepository statementRepository;
    private final UserRepository userRepository;
    private final TransactionService transactionService;
    private final List<StatementParser> parsers;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Statement processStatement(MultipartFile file) throws IOException {
        User user = getCurrentUser();
        String originalFilename = file.getOriginalFilename();
        String fileType = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        StatementParser parser = parsers.stream()
                .filter(p -> p.canParse(fileType))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unsupported file type: " + fileType));

        List<TransactionRequest> transactions = parser.parse(file);
        
        // Save transactions
        for (TransactionRequest request : transactions) {
            transactionService.createTransaction(request);
        }

        // Save Statement Record
        Statement statement = new Statement();
        statement.setUserId(user.getId());
        statement.setFilename(originalFilename);
        statement.setFileType(fileType);
        statement.setStatus("PROCESSED");
        statement.setTransactionCount(transactions.size());
        
        return statementRepository.save(statement);
    }
    
    public List<Statement> getUserStatements() {
         User user = getCurrentUser();
         return statementRepository.findByUserIdOrderByUploadedAtDesc(user.getId());
    }
}
