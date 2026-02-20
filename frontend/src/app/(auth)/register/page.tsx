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

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", data);
      const { token, email, firstName, lastName } = response.data;
      setAuth(token, { email, firstName, lastName });
      toast.success("Account created successfully");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed.");
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
          <h1 className="text-2xl font-heading font-bold tracking-tight text-neutral-900">Create an account</h1>
          <p className="text-neutral-500 text-sm mt-2 font-medium tracking-tight">Enter your details to get started.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-black/[0.03] border border-black/[0.04]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-700 font-semibold text-sm">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Jane" 
                          className="h-11 bg-neutral-50 border-black/[0.06] text-neutral-900 placeholder:text-neutral-400 rounded-lg focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors shadow-sm"
                          {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-700 font-semibold text-sm">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          className="h-11 bg-neutral-50 border-black/[0.06] text-neutral-900 placeholder:text-neutral-400 rounded-lg focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors shadow-sm"
                          {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              
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
                    <FormLabel className="text-neutral-700 font-semibold text-sm">Password</FormLabel>
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
                className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-medium transition-all shadow-md shadow-neutral-900/10 mt-4" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white/70" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-sm font-medium text-neutral-500 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
