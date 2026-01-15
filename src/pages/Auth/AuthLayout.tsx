import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect /auth to /auth/login by default
    if (location.pathname === "/auth" || location.pathname === "/auth/") {
      navigate("/auth/login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6 ">
      <div className="absolute top-10 left-10 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary font-bold">
            payments
          </span>
        </div>
        <span className="text-white  text-xl tracking-tight">
          AreaWins Bet
        </span>
      </div>

      <div className="w-full max-w-md">
        <Outlet />
      </div>

      <div className="absolute bottom-10 text-white/20 text-[10px] font-bold tracking-widest uppercase">
        © 2023 AreaWins Bet Internal Systems • Level 4 Security Active
      </div>
    </div>
  );
};

export default AuthLayout;
