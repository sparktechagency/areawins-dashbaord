import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../types";
import logo from "../assets/logo/logo.png";
import { toggleSidebar } from "../redux/features/dashboard/dashboardSlice";

const navItems = [
  { label: "Overview", icon: "grid_view", path: "/" },
  { label: "User Management", icon: "group", path: "/users" },
  { label: "Sport Categories", icon: "category", path: "/categories" },
  { label: "Bet Types", icon: "style", path: "/bet-types" },
  {
    label: "Match Management",
    icon: "sports_soccer",
    path: "/match-management",
  },

  { label: "Bet Management", icon: "confirmation_number", path: "/bets" },
];

const financialItems = [
  {
    label: "Transactions",
    icon: "account_balance_wallet",
    path: "/financials",
  },
  { label: "Promotions", icon: "campaign", path: "/promotions" },
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isSidebarOpen, user = { name: "Admin", role: "Super Admin" } } =
    useSelector((state: RootState) => state.dashboard) || {};

  const isActive = (path: string) => location.pathname === path;

  const handleMobileNavClick = () => {
    if (window.innerWidth < 1024) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(toggleSidebar())}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-secondary flex flex-col h-full shrink-0 transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${
            isSidebarOpen
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full lg:w-20 lg:translate-x-0"
          }
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(isSidebarOpen || window.innerWidth < 1024) && (
              <div className={`${!isSidebarOpen && "lg:hidden"}`}>
                <Link to="/">
                  <img src={logo} alt="logo" className="w-full h-12 mx-auto" />
                </Link>
              </div>
            )}
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden p-2 text-white/50 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 flex flex-col gap-1 space-y-1 overflow-y-auto custom-scrollbar no-scrollbar">
          {isSidebarOpen && (
            <div className="text-white/30 text-[11px] font-bold px-3 py-2 tracking-wider mt-4">
              Main Menu
            </div>
          )}
          {navItems?.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleMobileNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all group ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[22px] shrink-0">
                {item.icon}
              </span>
              <span
                className={`text-sm font-semibold truncate ${
                  !isSidebarOpen && "lg:hidden"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}

          {isSidebarOpen && (
            <div className="text-white/30 text-[11px] font-bold px-3 py-3 tracking-wider">
              Platform
            </div>
          )}
          {financialItems?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={handleMobileNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all group ${
                isActive(item.path)
                  ? "bg-black/80 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[22px] shrink-0">
                {item.icon}
              </span>
              <span
                className={`text-sm font-semibold truncate ${
                  !isSidebarOpen && "lg:hidden"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}

          <div>
            <Link
              to="/settings"
              onClick={handleMobileNavClick}
              className={`flex items-center gap-3 px-3 py-3 rounded transition-all ${
                isActive("/settings")
                  ? "bg-secondary/20 text-accent"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[22px] shrink-0">
                settings
              </span>
              <span
                className={`text-sm font-semibold truncate ${
                  !isSidebarOpen && "lg:hidden"
                }`}
              >
                Settings
              </span>
            </Link>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/5 bg-black/10">
          <Link
            to="/profile"
            onClick={handleMobileNavClick}
            className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-all"
          >
            <img
              className="size-10 rounded-full border border-white/10 shrink-0"
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "Alex"}`}
              alt="Avatar"
            />
            <div
              className={`flex-1 min-w-0 text-left ${
                !isSidebarOpen && "lg:hidden"
              }`}
            >
              <p className="text-white text-xs font-bold truncate">
                {user?.name}
              </p>
              <p className="text-white/40 text-[10px] truncate">{user?.role}</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
