import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Forgot Password Data:", data);
    toast.success("Security code sent!", {
      description: `We've sent a code to ${data.email}`,
    });
    // Navigate to OTP page, potentially passing email in state
    navigate("/auth/otp", { state: { email: data.email } });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300 border border-white/10 p-6 rounded-lg">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white mb-2">Recover Access</h2>
        <p className="text-white/50 text-sm leading-relaxed">
          Enter your registered email address and we'll send you a temporary
          security code to reset your key.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Work Email Address"
                    {...field}
                    className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-primary/50"
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
            Send Security Code
          </Button>

          <Link to="/auth/login" className="block w-full">
            <Button
              variant="ghost"
              type="button"
              className="w-full text-white/40 hover:text-white hover:bg-white/5"
            >
              Back to Authentication
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
