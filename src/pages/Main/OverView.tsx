import { Skeleton } from "@/components/ui/skeleton";
import { useGetStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import StatCard from "./StatCard";

const OverView = () => {
  const { data: statsRes, isLoading: statsLoading } = useGetStatsQuery({});
  const { data: pendingWithdrawalsRes, isLoading: pendingLoading } =
    useGetAllTransactionsQuery({
      status: "pending",
      type: "withdraw",
    });

  const stats = statsRes?.data;
  const pendingCount =
    pendingWithdrawalsRes?.data?.pagination?.totalResult || 0;

  if (statsLoading || pendingLoading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        title="Total Profit"
        value={`$${stats?.totalProfit?.toLocaleString() || "0"}`}
        trend="+12.5%"
        trendText="vs last month"
        icon="monetization_on"
        iconColor="accent"
      />
      <StatCard
        title="Active Users"
        value={stats?.activeUsers?.toLocaleString() || "0"}
        trend="+5.2%"
        trendText="real-time"
        icon="person_celebrate"
      />
      <StatCard
        title="Total Bets"
        value={stats?.totalBets?.toLocaleString() || "0"}
        trend="+8.1%"
        trendText="live volume"
        icon="receipt_long"
      />
      <StatCard
        title="Pending Withdrawals"
        value={pendingCount.toString()}
        trend={pendingCount > 10 ? "High Priority" : "Normal"}
        trendText="Requires action"
        icon="priority_high"
        isAlert={pendingCount > 0}
      />
    </div>
  );
};

export default OverView;
