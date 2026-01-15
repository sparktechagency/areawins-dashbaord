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
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

type OtpValues = z.infer<typeof otpSchema>;

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  // We'll use a single input for simplicity in form state, but UI will look like 6 boxes
  const form = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: OtpValues) => {
    console.log("OTP Data:", data);
    toast.success("Code verified successfully");
    navigate("/auth/reset-password");
  };

  // Custom UI handling for OTP inputs to map to the single string value
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const currentOtp = form.getValues("otp").split("");
    // Ensure array is 6 long
    while (currentOtp.length < 6) currentOtp.push("");

    currentOtp[index] = value;
    const newValue = currentOtp.join(""); // only take first 6 chars
    form.setValue("otp", newValue.substring(0, 6));

    // Auto move focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !form.getValues("otp")[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 border border-white/10 p-6 rounded-lg">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white mb-4">Verification</h2>
        <p className="text-white/50 text-sm mb-10">
          We've sent a 6-digit code to{" "}
          <span className="text-primary font-bold">{email}</span>. Enter it
          below to proceed.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="otp"
            render={() => (
              <FormItem>
                <div className="flex justify-between gap-3">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <FormControl key={i}>
                      <Input
                        ref={(el) => {
                          inputRefs.current[i] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={form.watch("otp")[i] || ""}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="size-12 bg-white/5 border-white/10 text-center text-xl font-black text-primary focus-visible:ring-primary/50 p-0"
                      />
                    </FormControl>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 cursor-pointer bg-primary text-secondary hover:bg-primary/90"
          >
            Verify Code
          </Button>

          <div className="text-center">
            <Button
              variant="ghost"
              type="button"
              className="text-white/30 text-xs font-bold hover:text-white hover:bg-transparent"
              onClick={() => toast.info("Code resent successfully")}
            >
              Didn't receive code? Resend
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
