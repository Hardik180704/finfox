package com.finfox.asset;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping
    public ResponseEntity<List<Asset>> getAssets() {
        return ResponseEntity.ok(assetService.getAssetsForCurrentUser());
    }

    @PostMapping
    public ResponseEntity<Asset> addAsset(@RequestBody Asset asset) {
        return ResponseEntity.ok(assetService.addAsset(asset));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable String id, @RequestBody Asset asset) {
        return ResponseEntity.ok(assetService.updateAsset(id, asset));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable String id) {
        assetService.deleteAsset(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/total-value")
    public ResponseEntity<BigDecimal> getTotalPortfolioValue() {
        return ResponseEntity.ok(assetService.calculateTotalPortfolioValue());
    }
}
