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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema) as any,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordValues) => {
    console.log("Reset Password Data:", data);
    toast.success("Password updated!", {
      description: "You can now login with your new password.",
    });
    navigate("/auth/login");
  };

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-300 border border-white/10 p-6 rounded-lg">
      <h2 className="text-3xl font-black text-white mb-6">
        Reset Security Key
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  New Password
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  Confirm New Password
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

          <Button
            type="submit"
            className="w-full h-12 cursor-pointer bg-primary text-secondary hover:bg-primary/90"
          >
            Update & Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
