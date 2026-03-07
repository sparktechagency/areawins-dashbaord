import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      <Sidebar />
      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
