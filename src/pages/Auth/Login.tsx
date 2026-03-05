import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setEncryptedToken } from "@/utils/token.utils";
import {
  LoginFormValues,
  loginValidationSchema,
} from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data).unwrap();
      if (res?.data?.tokens) {
        setEncryptedToken("accessToken", res.data.tokens.accessToken);
        setEncryptedToken("refreshToken", res.data.tokens.refreshToken);
      }

      toast.success("Login successful");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data?.message || "Login failed");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 border border-white/10 p-6 rounded-lg">
      <div>
        <h2 className="text-4xl font-black text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-white/40 font-bold  text-[11px] tracking-widest">
          Admin Control Center
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="admin@areawins.com"
            labelClassName="text-white/40"
            inputClassName="border-white/10 text-white"
          />

          <FormInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="••••••••"
            labelClassName="text-white/40"
            inputClassName="border-white/10 text-white"
            showPasswordToggle={true}
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
            disabled={isLoading}
            className="w-full h-12 cursor-pointer bg-primary text-secondary hover:bg-primary/90"
          >
            {isLoading ? "Logging in..." : "Enter Dashboard"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
