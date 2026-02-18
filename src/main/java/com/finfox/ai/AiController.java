package com.finfox.ai;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiAdvisorService aiAdvisorService;
    private final NlpQueryService nlpQueryService;

    public AiController(AiAdvisorService aiAdvisorService, NlpQueryService nlpQueryService) {
        this.aiAdvisorService = aiAdvisorService;
        this.nlpQueryService = nlpQueryService;
    }

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
