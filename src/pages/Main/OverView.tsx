import React from "react";
import StatCard from "./StatCard";

const OverView = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        title="Total Revenue"
        value="$128,430"
        trend="+12.5%"
        trendText="vs last month"
        icon="monetization_on"
        iconColor="accent"
      />
      <StatCard
        title="Active Users"
        value="14,205"
        trend="+5.2%"
        trendText="real-time"
        icon="person_celebrate"
      />
      <StatCard
        title="Active Bets"
        value="3,842"
        trend="+8.1%"
        trendText="live volume"
        icon="receipt_long"
      />
      <StatCard
        title="Pending Withdrawals"
        value="42"
        trend="High Priority"
        trendText="Requires action"
        icon="priority_high"
        isAlert
      />
    </div>
  );
};

export default OverView;
