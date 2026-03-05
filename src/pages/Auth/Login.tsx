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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { loggedUser } from "@/redux/features/auth/authSlice";
import { setEncryptedToken } from "@/utils/token.utils";
import {
  LoginFormValues,
  loginValidationSchema,
} from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormValues,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    try {
      const res = await login(data).unwrap();

      if (res?.data?.tokens) {
        setEncryptedToken("accessToken", res.data.tokens.accessToken);
        setEncryptedToken("refreshToken", res.data.tokens.refreshToken);

        // Update Redux state
        dispatch(
          loggedUser({
            token: res.data.tokens.accessToken,
            user: res.data.user,
          }),
        );
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black text-white/40  tracking-widest ml-1">
                  Email
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
              <FormItem>
                <FormLabel className="text-xs font-black text-white/40  tracking-widest ml-1">
                  Password
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
