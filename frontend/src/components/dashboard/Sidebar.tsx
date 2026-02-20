"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Receipt, Upload, Bot, Wallet, BarChart3 } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: Receipt,
  },
  {
    title: "Budgets",
    href: "/dashboard/budgets",
    icon: Wallet,
  },
  {
    title: "Import",
    href: "/dashboard/import",
    icon: Upload,
  },
  {
    title: "AI Advisor",
    href: "/dashboard/ai",
    icon: Bot,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 bg-neutral-50 border-r border-black/[0.04] min-h-screen text-neutral-900", className)}>
      <div className="space-y-4 py-6">
        <div className="px-4 py-2">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8 px-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-sm shadow-blue-500/20">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">Finfox</span>
          </Link>
          
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10 px-3 rounded-lg transition-all",
                    isActive 
                      ? "bg-white text-neutral-900 font-medium shadow-sm border border-black/[0.04]" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className={cn("mr-3 h-4 w-4", isActive ? "text-blue-600" : "text-neutral-400")} />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
