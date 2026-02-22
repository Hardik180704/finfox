"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { DownloadCloud } from "lucide-react";
import api from "@/lib/api";

export function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDownloadReport = async () => {
    try {
      const response = await api.get('/reports/financial-health', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'financial-health-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 bg-white/80 backdrop-blur-md border-b border-black/[0.04] px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="sm:hidden text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0 border-r border-black/[0.04] bg-neutral-50">
          <Sidebar />
        </SheetContent>
      </Sheet>
      
      <div className="flex w-full items-center justify-end gap-3 md:ml-auto mt-4 lg:mt-6 mb-4 lg:mb-6">
        
        <Button onClick={handleDownloadReport} variant="outline" size="sm" className="hidden sm:flex gap-2 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
          <DownloadCloud className="h-4 w-4" />
          Export Report
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 h-9 w-9">
          <Bell className="h-4 w-4" />
        </Button>

        <div className="h-5 w-px bg-black/[0.08] mx-1 hidden sm:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full ring-2 ring-white hover:ring-neutral-100 transition-all bg-white shadow-sm border border-black/[0.04] h-9 w-9">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-50 text-blue-700 text-xs font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-black/[0.06] text-neutral-900 shadow-xl rounded-xl p-1.5">
            <DropdownMenuLabel className="font-normal px-2.5 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-neutral-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs leading-none text-neutral-500">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black/[0.04] my-1" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50 font-medium cursor-pointer rounded-lg px-2.5 py-2 transition-colors">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
