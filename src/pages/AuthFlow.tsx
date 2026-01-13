import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Input
} from "../components/ui";

type Step = "LOGIN" | "FORGOT" | "OTP" | "RESET";

const AuthFlow: React.FC = () => {
  const [step, setStep] = useState<Step>("LOGIN");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const renderStep = () => {
    switch (step) {
      case "LOGIN":
        return (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-white/40 font-bold uppercase text-[11px] tracking-widest mb-10">
              Admin Control Center
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  Work Email
                </label>
                <Input
                  required
                  type="email"
                  className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-accent"
                  placeholder="admin@easybet.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  Security Key
                </label>
                <Input
                  required
                  type="password"
                  className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-accent"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="link"
                  size="sm"
                  type="button"
                  onClick={() => setStep("FORGOT")}
                  className="text-[#00D65C] font-black p-0 h-auto"
                >
                  Recover Password?
                </Button>
              </div>
              <Button
                type="submit"
                variant="accent"
                className="w-full h-12 text-lg uppercase tracking-wider"
              >
                Enter Dashboard
              </Button>
            </form>
          </div>
        );
      case "FORGOT":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <h2 className="text-3xl font-black text-white mb-6">
              Recover Access
            </h2>
            <p className="text-white/50 text-sm mb-10 leading-relaxed">
              Enter your registered email address and we'll send you a temporary
              security code to reset your key.
            </p>
            <div className="space-y-6">
              <Input
                className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-accent"
                placeholder="Work Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="accent"
                className="w-full h-12 uppercase tracking-wider"
                onClick={() => setStep("OTP")}
              >
                Send Security Code
              </Button>
              <Button
                variant="ghost"
                className="w-full text-white/40 hover:text-white hover:bg-white/5"
                onClick={() => setStep("LOGIN")}
              >
                Back to Authentication
              </Button>
            </div>
          </div>
        );
      case "OTP":
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-3xl font-black text-white mb-4">
              Verification
            </h2>
            <p className="text-white/50 text-sm mb-10">
              We've sent a 6-digit code to{" "}
              <span className="text-[#00D65C] font-bold">
                {email || "your email"}
              </span>
              . Enter it below to proceed.
            </p>
            <div className="space-y-8">
              <div className="flex justify-between gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Input
                    key={i}
                    maxLength={1}
                    className="size-12 bg-white/5 border-white/10 text-center text-xl font-black text-[#00D65C] focus-visible:ring-accent"
                  />
                ))}
              </div>
              <Button
                variant="accent"
                className="w-full h-12 uppercase tracking-wider"
                onClick={() => setStep("RESET")}
              >
                Verify Code
              </Button>
              <div className="text-center">
                <Button
                  variant="ghost"
                  className="text-white/30 text-xs font-bold hover:text-white hover:bg-transparent"
                >
                  Didn't receive code? Resend
                </Button>
              </div>
            </div>
          </div>
        );
      case "RESET":
        return (
          <div className="animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-black text-white mb-6">
              Reset Security Key
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus-visible:ring-accent"
                />
              </div>
              <Button
                variant="accent"
                className="w-full h-12 uppercase tracking-wider"
                onClick={() => setStep("LOGIN")}
              >
                Update & Login
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 font-sans">
      <div className="absolute top-10 left-10 flex items-center gap-3">
        <div className="size-10 bg-[#00D65C] rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-black font-bold">
            payments
          </span>
        </div>
        <span className="text-white font-black text-xl tracking-tight">
          Easy Bet
        </span>
      </div>

      <div className="w-full max-w-md">{renderStep()}</div>

      <div className="absolute bottom-10 text-white/20 text-[10px] font-bold tracking-widest uppercase">
        © 2023 Easy Bet Internal Systems • Level 4 Security Active
      </div>
    </div>
  );
};

export default AuthFlow;
