import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
          <FormInput
            control={form.control}
            name="password"
            label="New Password"
            placeholder="••••••••"
            showPasswordToggle={true}
            labelClassName="text-white/40"
            inputClassName="border-white/10 text-white"
          />

          <FormInput
            control={form.control}
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="••••••••"
            showPasswordToggle={true}
            labelClassName="text-white/40"
            inputClassName="border-white/10 text-white"
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
