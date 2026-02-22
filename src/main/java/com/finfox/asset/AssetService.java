package com.finfox.asset;

import com.finfox.user.User;
import com.finfox.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    public AssetService(AssetRepository assetRepository, UserRepository userRepository) {
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<Asset> getAssetsForCurrentUser() {
        return assetRepository.findAllByUserId(getCurrentUser().getId());
    }

    public Asset addAsset(Asset asset) {
        asset.setUserId(getCurrentUser().getId());
        asset.setCreatedAt(LocalDateTime.now());
        asset.setLastUpdated(LocalDateTime.now());
        return assetRepository.save(asset);
    }

    public Asset updateAsset(String id, Asset updatedAsset) {
        Asset existingAsset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        if (!existingAsset.getUserId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        existingAsset.setType(updatedAsset.getType());
        existingAsset.setSymbol(updatedAsset.getSymbol());
        existingAsset.setName(updatedAsset.getName());
        existingAsset.setQuantity(updatedAsset.getQuantity());
        
        if (updatedAsset.getCurrentPrice() != null) {
            existingAsset.setCurrentPrice(updatedAsset.getCurrentPrice());
        }
        if (updatedAsset.getAveragePurchasePrice() != null) {
            existingAsset.setAveragePurchasePrice(updatedAsset.getAveragePurchasePrice());
        }
        if (updatedAsset.getCurrency() != null) {
            existingAsset.setCurrency(updatedAsset.getCurrency());
        }
        existingAsset.setLastUpdated(LocalDateTime.now());

        return assetRepository.save(existingAsset);
    }

    public void deleteAsset(String id) {
        Asset existingAsset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        if (!existingAsset.getUserId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        assetRepository.delete(existingAsset);
    }

    public BigDecimal calculateTotalPortfolioValue() {
        List<Asset> assets = getAssetsForCurrentUser();
        return assets.stream()
                .filter(a -> a.getQuantity() != null && a.getCurrentPrice() != null)
                .map(a -> a.getQuantity().multiply(a.getCurrentPrice()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
