package com.finfox.statement.parser;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finfox.transaction.dto.TransactionRequest;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.anthropic.AnthropicChatModel;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class PdfStatementParser implements StatementParser {

    private static final Logger log = LoggerFactory.getLogger(PdfStatementParser.class);

    private final AnthropicChatModel chatModel;
    private final ObjectMapper objectMapper;

    public PdfStatementParser(AnthropicChatModel chatModel, ObjectMapper objectMapper) {
        this.chatModel = chatModel;
        this.objectMapper = objectMapper;
    }

    @Override
    public boolean canParse(String fileType) {
        return "pdf".equalsIgnoreCase(fileType);
    }

    @Override
    public List<TransactionRequest> parse(MultipartFile file) throws IOException {
        String text = extractTextFromPdf(file.getInputStream());

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

        String jsonResponse = chatModel.call(prompt);

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
        try (PDDocument document = org.apache.pdfbox.Loader.loadPDF(inputStream.readAllBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
}
