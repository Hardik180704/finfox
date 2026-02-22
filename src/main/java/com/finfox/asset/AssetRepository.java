package com.finfox.asset;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends MongoRepository<Asset, String> {
    List<Asset> findAllByUserId(String userId);
}
