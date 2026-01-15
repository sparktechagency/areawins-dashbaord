import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

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
        <Link to="/">
          <img src={logo} alt="logo" className="w-full h-12 mx-auto" />
        </Link>
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
