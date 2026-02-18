package com.finfox.ai;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiAdvisorService aiAdvisorService;
    private final NlpQueryService nlpQueryService;

    @GetMapping("/savings-report")
    public ResponseEntity<String> getSavingsReport() {
        return ResponseEntity.ok(aiAdvisorService.getSavingsAdvice());
    }

    @PostMapping("/query")
    public ResponseEntity<Map<String, String>> query(@RequestBody Map<String, String> payload) {
        String question = payload.get("query");
        String answer = nlpQueryService.processQuery(question);
        return ResponseEntity.ok(Map.of("answer", answer));
    }
}
