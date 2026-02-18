package com.finfox.statement;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/statements")
@RequiredArgsConstructor
public class StatementController {

    private final StatementService statementService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Statement> uploadStatement(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(statementService.processStatement(file));
    }

    @GetMapping
    public ResponseEntity<List<Statement>> getStatements() {
        return ResponseEntity.ok(statementService.getUserStatements());
    }
}
