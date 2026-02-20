"use client";

import { DollarSign, ArrowUpRight, ArrowDownRight, Activity, MoreHorizontal, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
];

const recentTransactions = [
  { id: 1, date: "2024-03-01", description: "Grocery Store", amount: -120.50, category: "Food", type: "EXPENSE" },
  { id: 2, date: "2024-03-02", description: "Salary", amount: 4500.00, category: "Income", type: "INCOME" },
  { id: 3, date: "2024-03-03", description: "Electric Bill", amount: -85.20, category: "Utilities", type: "EXPENSE" },
  { id: 4, date: "2024-03-04", description: "Coffee Shop", amount: -4.50, category: "Food", type: "EXPENSE" },
  { id: 5, date: "2024-03-05", description: "Internet", amount: -60.00, category: "Utilities", type: "EXPENSE" },
];

function CardWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white border border-black/[0.04] rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSummary({ income: 8400, expense: 3450, balance: 4950 });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <div className="text-sm font-medium text-neutral-500 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-neutral-300 border-t-neutral-900 animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 max-w-7xl mx-auto w-full pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold tracking-tight text-neutral-900 mb-1">Financial Overview</h2>
          <p className="text-neutral-500 text-sm font-medium tracking-tight">Here's what's happening with your money today.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-9 bg-white border-black/[0.06] shadow-sm text-neutral-700 font-medium">
             <Download className="w-4 h-4 mr-2" />
             Export
           </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Net Balance", value: `$${summary.balance.toFixed(2)}`, trend: "+20.1%", trendUp: true, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Income", value: `$${summary.income.toFixed(2)}`, trend: "+10.5%", trendUp: true, icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "Expenses", value: `$${summary.expense.toFixed(2)}`, trend: "-4%", trendUp: false, icon: ArrowDownRight, color: "text-red-600", bg: "bg-red-50" },
          { title: "Active Budgets", value: "4", trend: "2 nearing limit", trendUp: false, icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((card, i) => (
          <CardWrapper key={i} className="p-5 flex flex-col justify-between h-36 hover:shadow-md transition-shadow">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-600">{card.title}</h3>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-900 tracking-tight">{card.value}</div>
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${card.trendUp ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-600"}`}>
                  {card.trend}
                </span>
                <span className="text-xs font-medium text-neutral-500 ml-2">vs last month</span>
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CardWrapper className="col-span-4 p-6 flex flex-col h-[420px]">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-heading font-bold tracking-tight text-neutral-900">Cash Flow</h3>
              <p className="text-sm font-medium text-neutral-500 tracking-tight">Income and expenses over time</p>
            </div>
            <select className="text-sm font-medium bg-neutral-50 border border-black/[0.06] rounded-lg px-3 py-1.5 text-neutral-700 outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Last 6 months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 w-full relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis 
                  dataKey="name" 
                  stroke="#a3a3a3"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  fontWeight={500}
                />
                <YAxis
                  stroke="#a3a3a3"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  dx={-10}
                  fontWeight={500}
                />
                <Tooltip 
                  cursor={{fill: '#f5f5f5'}}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid rgba(0,0,0,0.06)', 
                    background: '#ffffff',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                  itemStyle={{ color: '#171717' }}
                  labelStyle={{ color: '#737373', marginBottom: '4px' }}
                />
                <Bar dataKey="income" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={36} />
                <Bar dataKey="expense" fill="#d4d4d8" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardWrapper>
        
        <CardWrapper className="col-span-3 flex flex-col h-[420px] overflow-hidden">
          <div className="p-6 border-b border-black/[0.04] flex items-center justify-between bg-white z-10">
            <div>
              <h3 className="text-lg font-heading font-bold tracking-tight text-neutral-900">Recent Transactions</h3>
              <p className="text-sm font-medium text-neutral-500 tracking-tight">Latest activity</p>
            </div>
            <Button variant="ghost" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3">
              View all
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-black/[0.04] hover:bg-transparent bg-neutral-50/50">
                  <TableHead className="text-neutral-500 h-11 font-semibold text-xs uppercase tracking-wider">Description</TableHead>
                  <TableHead className="text-neutral-500 h-11 font-semibold text-xs uppercase tracking-wider text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id} className="border-black/[0.04] hover:bg-neutral-50 transition-colors">
                    <TableCell className="py-3.5">
                      <div className="font-semibold text-neutral-900 text-sm">{tx.description}</div>
                      <div className="text-xs font-medium text-neutral-500 mt-1">{tx.category}</div>
                    </TableCell>
                    <TableCell className="text-right py-3.5">
                      <div className={`text-sm font-semibold ${tx.amount > 0 ? "text-emerald-600" : "text-neutral-900"}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-neutral-900">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl shadow-lg border-black/[0.06] font-medium text-sm">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit category</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-700">Flag transaction</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
