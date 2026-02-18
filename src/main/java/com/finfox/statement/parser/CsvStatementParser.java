package com.finfox.statement.parser;

import com.finfox.transaction.dto.TransactionRequest;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class CsvStatementParser implements StatementParser {

    @Override
    public boolean canParse(String fileType) {
        return "csv".equalsIgnoreCase(fileType);
    }

    @Override
    public List<TransactionRequest> parse(MultipartFile file) {
        List<TransactionRequest> transactions = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] line;
            reader.readNext(); // Skip header
            while ((line = reader.readNext()) != null) {
                // Assuming CSV format: Date, Description, Amount, Category, Type, PaymentMethod
                TransactionRequest transaction = new TransactionRequest();
                transaction.setDate(LocalDate.parse(line[0], DateTimeFormatter.ISO_LOCAL_DATE));
                transaction.setDescription(line[1]);
                transaction.setAmount(new BigDecimal(line[2]));
                transaction.setCategory(line[3]);
                transaction.setType(line[4]); // INCOME/EXPENSE
                transaction.setPaymentMethod(line[5]);
                transactions.add(transaction);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error parsing CSV file: " + e.getMessage());
        }
        return transactions;
    }
}
