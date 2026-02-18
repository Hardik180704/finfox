package com.finfox.analytics;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final AnomalyDetectionService anomalyDetectionService;

    @GetMapping("/monthly")
    public ResponseEntity<Map<String, BigDecimal>> getMonthlySpend() {
        return ResponseEntity.ok(analyticsService.getMonthlySpend());
    }

    @GetMapping("/categories")
    public ResponseEntity<Map<String, BigDecimal>> getCategoryBreakdown() {
        return ResponseEntity.ok(analyticsService.getCategoryBreakdown());
    }
    
    @PostMapping("/detect-anomalies")
    public ResponseEntity<Void> triggerAnomalyDetection() {
        anomalyDetectionService.detectAnomalies();
        return ResponseEntity.ok().build();
    }
}
