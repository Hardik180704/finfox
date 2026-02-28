export interface Transaction {
  id: string;
  userId: string;
  date: string;
  amount: number;
  description?: string;
  category: string;
  type: "INCOME" | "EXPENSE";
  paymentMethod?: string;
  isAnomalous: boolean;
  anomalyReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionRequest {
  date: string;
  amount: number;
  description?: string;
  category: string;
  type: "INCOME" | "EXPENSE";
  paymentMethod?: string;
}

export interface CategoryBreakdown {
  [category: string]: number;
}

export interface MonthlySpend {
  [month: string]: {
    INCOME?: number;
    EXPENSE?: number;
  };
}
