"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { TransactionForm } from "@/components/transactions/TransactionForm";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transactions?sort=date,desc');
      // Spring Data REST Pageable returns `{ content: [] }`
      setTransactions(data.content || data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <div className="p-8 pb-20">Loading transactions...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-neutral-900">
            Transactions
          </h1>
          <p className="text-neutral-500 mt-1">
            Track and manage your income and expenses.
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>

      <Card className="border-black/[0.04] shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Your Transactions</CardTitle>
          <CardDescription>
            A detailed view of your current transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.04] text-left text-neutral-500">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 text-right font-medium">Amount</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-neutral-500"
                    >
                      No transactions found. Add a transaction to start tracking.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="group">
                      <td className="py-4 text-neutral-500 w-32 whitespace-nowrap">{tx.date}</td>
                      <td className="py-4 font-medium text-neutral-900">{tx.description || '-'}</td>
                      <td className="py-4 text-neutral-500">{tx.category}</td>
                      <td className="py-4 text-right">
                        <span className={`font-semibold ${tx.type === 'INCOME' ? "text-emerald-600" : "text-neutral-900"}`}>
                           {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 text-right w-24">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-neutral-500 hover:text-blue-600"
                            onClick={() => handleEdit(tx)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-neutral-500 hover:text-red-600"
                            onClick={() => handleDelete(tx.id)}
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

      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={fetchTransactions}
        existingTransaction={editingTransaction}
      />
    </div>
  );
}
