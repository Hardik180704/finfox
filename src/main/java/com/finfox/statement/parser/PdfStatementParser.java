package com.finfox.statement.parser;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finfox.transaction.dto.TransactionRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class PdfStatementParser implements StatementParser {

    private final ChatClient.Builder chatClientBuilder;
    private final ObjectMapper objectMapper;

    @Override
    public boolean canParse(String fileType) {
        return "pdf".equalsIgnoreCase(fileType);
    }

    @Override
    public List<TransactionRequest> parse(MultipartFile file) throws IOException {
        String text = extractTextFromPdf(file.getInputStream());
        
        // Use AI to parse the text into structured JSON
        String prompt = """
            You are a financial assistant. Key tasks:
            1. Analyze the following bank statement text.
            2. Extract all transactions into a JSON array.
            3. Each transaction must have: date (YYYY-MM-DD), description, amount (negative for expense, positive for income), category, type (INCOME/EXPENSE), paymentMethod (e.g., CARD, TRANSFER).
            4. If category is missing, infer it from description.
            5. Return ONLY the JSON array, no markdown or other text.
            
            Statement Text:
            %s
            """.formatted(text);

        ChatClient chatClient = chatClientBuilder.build();
        String jsonResponse = chatClient.prompt().user(prompt).call().content();

        // Clean up response if it contains markdown code blocks
        if (jsonResponse.contains("```json")) {
            jsonResponse = jsonResponse.substring(jsonResponse.indexOf("```json") + 7);
            jsonResponse = jsonResponse.substring(0, jsonResponse.lastIndexOf("```"));
        } else if (jsonResponse.contains("```")) {
            jsonResponse = jsonResponse.substring(jsonResponse.indexOf("```") + 3);
            jsonResponse = jsonResponse.substring(0, jsonResponse.lastIndexOf("```"));
        }

        try {
            return objectMapper.readValue(jsonResponse, new TypeReference<List<TransactionRequest>>() {});
        } catch (Exception e) {
            log.error("Failed to parse AI response: {}", jsonResponse, e);
            throw new RuntimeException("AI failed to parse statement", e);
        }
    }

    private String extractTextFromPdf(InputStream inputStream) throws IOException {
        try (PDDocument document = PDDocument.load(inputStream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
}
