package com.finfox.statement.parser;

import com.finfox.transaction.dto.TransactionRequest;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface StatementParser {
    boolean canParse(String fileType);
    List<TransactionRequest> parse(MultipartFile file) throws IOException;
}
