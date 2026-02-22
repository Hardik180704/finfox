"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { AssetForm } from "@/components/assets/AssetForm";

export interface Asset {
  id: string;
  type: string;
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: number;
  averagePurchasePrice?: number;
  currency: string;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  const fetchAssets = async () => {
    try {
      const [{ data: assetsData }, { data: totalData }] = await Promise.all([
        api.get<Asset[]>("/assets"),
        api.get<number>("/assets/total-value"),
      ]);
      setAssets(assetsData);
      setTotalValue(totalData);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    try {
      await api.delete(`/assets/${id}`);
      fetchAssets();
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingAsset(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <div className="p-8">Loading assets...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-neutral-900">
            Portfolio
          </h1>
          <p className="text-neutral-500 mt-1">
            Track and manage your investments.
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm gap-2">
          <Plus className="w-4 h-4" />
          Add Asset
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-black/[0.04] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-neutral-900">
              {formatCurrency(totalValue)}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              across {assets.length} assets
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-black/[0.04] shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Your Assets</CardTitle>
          <CardDescription>
            A detailed view of your current holdings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.04] text-left text-neutral-500">
                  <th className="pb-3 font-medium">Asset</th>
                  <th className="pb-3 font-medium">Symbol</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 text-right font-medium">Quantity</th>
                  <th className="pb-3 text-right font-medium">Price</th>
                  <th className="pb-3 text-right font-medium">Total Value</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {assets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-neutral-500"
                    >
                      No assets found. Add an asset to start tracking your portfolio.
                    </td>
                  </tr>
                ) : (
                  assets.map((asset) => (
                    <tr key={asset.id} className="group">
                      <td className="py-4 font-medium text-neutral-900">{asset.name}</td>
                      <td className="py-4 text-neutral-500">{asset.symbol}</td>
                      <td className="py-4 text-neutral-500">{asset.type}</td>
                      <td className="py-4 text-right text-neutral-900">{asset.quantity}</td>
                      <td className="py-4 text-right text-neutral-900">
                        {formatCurrency(asset.currentPrice, asset.currency)}
                      </td>
                      <td className="py-4 text-right font-medium text-blue-600">
                        {formatCurrency(asset.quantity * asset.currentPrice, asset.currency)}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-neutral-500 hover:text-blue-600"
                            onClick={() => handleEdit(asset)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-neutral-500 hover:text-red-600"
                            onClick={() => handleDelete(asset.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AssetForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={fetchAssets}
        existingAsset={editingAsset}
      />
    </div>
  );
}
