import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/auth" || location.pathname === "/auth/") {
      navigate("/auth/login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6 ">
      <div className="w-full max-w-md">
        <Outlet />
      </div>

      <div className="absolute bottom-10 text-white/20 text-[10px] font-bold tracking-widest ">
        © {new Date().getFullYear()} AreaWins Bet Internal Systems • Level 4
        Security Active
      </div>
    </div>
  );
};

export default AuthLayout;
