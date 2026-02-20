"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Prevent flash of content

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] bg-[#FAFAFA] text-[#171717] font-sans selection:bg-[#E5E5E5] selection:text-[#171717]">
      <div className="hidden border-r border-black/[0.04] bg-neutral-50 md:block">
        <Sidebar className="h-full" />
      </div>
      <div className="flex flex-col w-full overflow-hidden bg-[#FAFAFA]">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8 pb-20 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
