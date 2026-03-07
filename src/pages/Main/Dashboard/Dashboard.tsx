import React from "react";
import Distribution from "./Distribution";
import OverView from "./OverView";
import RecentActivities from "./RecentActivities";
import RecentBets from "./RecentBets";
import RevenueChart from "./RevenueChart";

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
      <OverView />

      {/* Main Revenue Chart */}
      <RevenueChart />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-8">
        {/* Recent Bets */}
        <RecentBets />

        {/* Right Distribution & Activity */}
        <div className="xl:col-span-2 flex flex-col gap-6 md:gap-8">
          <Distribution />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
