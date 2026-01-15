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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // Mock login logic
    console.log("Login Data:", data);
    toast.success("Welcome back!");
    navigate("/");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 border border-white/10 p-6 rounded-lg">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-white/40 font-bold uppercase text-[11px] tracking-widest">
          Admin Control Center
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  Work Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin@areawins.com"
                    {...field}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  Security Key
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-primary font-bold text-sm hover:underline hover:text-primary/80"
            >
              Recover Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 cursor-pointer bg-primary text-secondary hover:bg-primary/90"
          >
            Enter Dashboard
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
