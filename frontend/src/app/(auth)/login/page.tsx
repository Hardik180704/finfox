"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { BarChart3, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      const { token, email, firstName, lastName } = response.data;
      setAuth(token, { email, firstName, lastName });
      toast.success("Signed in successfully");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#171717] font-sans selection:bg-[#E5E5E5] selection:text-[#171717]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
      
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center px-4 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-6 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold tracking-tight text-neutral-900">Sign in to Finfox</h1>
          <p className="text-neutral-500 text-sm mt-2 font-medium tracking-tight">Welcome back! Please enter your details.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-black/[0.03] border border-black/[0.04]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 font-semibold text-sm">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        type="email" 
                        className="h-11 bg-neutral-50 border-black/[0.06] text-neutral-900 placeholder:text-neutral-400 rounded-lg focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors shadow-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-neutral-700 font-semibold text-sm">Password</FormLabel>
                      <Link href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        Forgot?
                      </Link>
                    </div>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        className="h-11 bg-neutral-50 border-black/[0.06] text-neutral-900 placeholder:text-neutral-400 rounded-lg focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors shadow-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs font-medium" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-medium transition-all shadow-md shadow-neutral-900/10 mt-2" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white/70" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-sm font-medium text-neutral-500 mt-8">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
