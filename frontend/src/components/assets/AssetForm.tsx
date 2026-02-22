"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Asset } from "@/app/(dashboard)/assets/page";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AssetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingAsset?: Asset | null;
}

export function AssetForm({
  isOpen,
  onClose,
  onSuccess,
  existingAsset,
}: AssetFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: existingAsset?.type || "STOCK",
    symbol: existingAsset?.symbol || "",
    name: existingAsset?.name || "",
    quantity: existingAsset?.quantity || 0,
    currentPrice: existingAsset?.currentPrice || 0,
    averagePurchasePrice: existingAsset?.averagePurchasePrice || 0,
    currency: existingAsset?.currency || "USD",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "currentPrice" || name === "averagePurchasePrice"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (existingAsset) {
        await api.put(`/assets/${existingAsset.id}`, formData);
      } else {
        await api.post("/assets", formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save asset:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{existingAsset ? "Edit Asset" : "Add Asset"}</SheetTitle>
          <SheetDescription>
            {existingAsset
              ? "Update the details of your existing asset."
              : "Enter the details to track a new asset in your portfolio."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Asset Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="STOCK">Stock</option>
                <option value="CRYPTO">Cryptocurrency</option>
                <option value="REAL_ESTATE">Real Estate</option>
                <option value="CASH">Cash</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol / Ticker</Label>
              <Input
                id="symbol"
                name="symbol"
                placeholder="e.g. AAPL, BTC"
                value={formData.symbol}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Asset Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Apple Inc, Bitcoin"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  step="any"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPrice">Current Price</Label>
                <Input
                  id="currentPrice"
                  name="currentPrice"
                  type="number"
                  step="any"
                  value={formData.currentPrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="averagePurchasePrice">Avg Purchase Price</Label>
                <Input
                  id="averagePurchasePrice"
                  name="averagePurchasePrice"
                  type="number"
                  step="any"
                  value={formData.averagePurchasePrice}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSubmitting ? "Saving..." : "Save Asset"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
