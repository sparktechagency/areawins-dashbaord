import React from "react";
import { MdPayments } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../types";
import { toggleSidebar } from "../redux/features/dashboard/dashboardSlice";

const Layout: React.FC = () => {
  const dashboardState =
    useSelector((state: RootState) => state.dashboard) || {};
  const {
    isSidebarOpen = true,
    user = { name: "Admin", role: "Super Admin" },
    notifications: notificationCount = 0,
  } = dashboardState;
  const dispatch = useDispatch();
  const location = useLocation();

  const navItems = [
    { label: "Overview", icon: "grid_view", path: "/" },
    { label: "User Management", icon: "group", path: "/users" },
    { label: "Categories", icon: "category", path: "/categories" },
    { label: "Bet Types", icon: "style", path: "/bet-types" },
    { label: "Sports Events", icon: "sports_soccer", path: "/matches" },
    { label: "Teams", icon: "shield", path: "/teams" },
    { label: "Tournaments", icon: "emoji_events", path: "/tournaments" },
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

  const isActive = (path: string) => location.pathname === path;

  // Function to handle link clicks on mobile
  const handleMobileNavClick = () => {
    if (window.innerWidth < 1024) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      {/* Sidebar Backdrop for Mobile */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(toggleSidebar())}
      />

      {/* Sidebar Drawer */}
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
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <MdPayments />
            </div>
            {(isSidebarOpen || window.innerWidth < 1024) && (
              <div className={`${!isSidebarOpen && "lg:hidden"}`}>
                <h1 className="text-white text-lg font-bold leading-none tracking-tight text-nowrap">
                  AreaWins Bet
                </h1>
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mt-1 text-nowrap text-left">
                  Admin Panel
                </p>
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
        <nav className="flex-1 px-4 py-2 flex flex-col gap-1  space-y-1 overflow-y-auto custom-scrollbar no-scrollbar">
          {isSidebarOpen && (
            <div className="text-white/30 text-[11px] font-bold uppercase px-3 py-2 tracking-wider mt-4">
              Main Menu
            </div>
          )}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleMobileNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
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
            <div className="text-white/30 text-[11px] font-bold uppercase px-3 py-3 tracking-wider">
              Platform
            </div>
          )}
          {financialItems?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={handleMobileNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
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
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
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

        {/* User Profile Section in Sidebar */}
        <div className="p-4 border-t border-white/5 bg-black/10">
          <Link
            to="/profile"
            onClick={handleMobileNavClick}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all"
          >
            <img
              className="size-10 rounded-full border border-white/10 shrink-0"
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                user?.name || "Alex"
              }`}
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

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Toggle Button */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-gray-600 block">
                {isSidebarOpen ? "menu_open" : "menu"}
              </span>
            </button>
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest truncate">
              <span className="hidden xs:inline">Admin</span>
              <span className="material-symbols-outlined text-[14px] hidden xs:inline">
                chevron_right
              </span>
              <span className="text-primary truncate max-w-[120px] md:max-w-none">
                {location.pathname === "/"
                  ? "Dashboard"
                  : location.pathname.split("/")[1].replace(/-/g, " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/notifications"
              className="size-10 rounded-xl hover:bg-gray-100 flex items-center justify-center relative transition-all border border-transparent hover:border-gray-200"
            >
              <span className="material-symbols-outlined text-gray-600">
                notifications
              </span>
              {notificationCount > 0 && (
                <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </Link>
            <Link
              to="/auth"
              className="size-10 rounded-xl bg-slate-50 text-gray-600 hover:text-red-500 flex items-center justify-center transition-all border border-gray-200"
            >
              <span className="material-symbols-outlined">logout</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
