import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../types";
import { toggleSidebar } from "../redux/features/dashboard/dashboardSlice";

const DashboardHeader: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isSidebarOpen, notifications: notificationCount = 0 } =
    useSelector((state: RootState) => state.dashboard) || {};

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shrink-0">
      {/* Left: Toggle  */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2.5 hover:bg-gray-100 rounded transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-gray-600 block">
            {isSidebarOpen ? "menu_open" : "menu"}
          </span>
        </button>
      </div>

      {/* Right: Notifications + Logout */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          to="/notifications"
          className="size-10 rounded hover:bg-gray-100 flex items-center justify-center relative transition-all border border-transparent hover:border-gray-200"
        >
          <span className="material-symbols-outlined text-gray-600">
            notifications
          </span>
          {notificationCount > 0 && (
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white" />
          )}
        </Link>
        <Link
          to="/auth"
          className="size-10 rounded bg-slate-50 text-gray-600 hover:text-red-500 flex items-center justify-center transition-all border border-gray-200"
        >
          <span className="material-symbols-outlined">logout</span>
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
