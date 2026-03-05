import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import moment from "moment";
import React, { useState } from "react";

const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "deposit" | "withdraw">(
    "all",
  );

  const { data: allTxRes, isLoading: loadingAll } = useGetAllTransactionsQuery(
    {},
  );
  const { data: depositTxRes, isLoading: loadingDeposits } =
    useGetAllTransactionsQuery({ type: "deposit" });
  const { data: withdrawTxRes, isLoading: loadingWithdrawals } =
    useGetAllTransactionsQuery({ type: "withdraw" });
  const { data: pendingWithdrawalsRes } = useGetAllTransactionsQuery({
    type: "withdraw",
    status: "pending",
  });

  const currentData =
    activeTab === "all"
      ? allTxRes?.data
      : activeTab === "deposit"
        ? depositTxRes?.data
        : withdrawTxRes?.data;

  const transactions = currentData?.data || [];
  const isLoading = loadingAll || loadingDeposits || loadingWithdrawals;

  const totalDeposits = depositTxRes?.data?.meta?.total || 0;
  const pendingCount = pendingWithdrawalsRes?.data?.meta?.total || 0;

  const getStatusColor = (status: string) => {
    if (status === "completed") return "text-green-600 bg-green-50";
    if (status === "pending") return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getTypeColor = (type: string) => {
    if (type === "deposit") return "text-blue-600 bg-blue-50";
    if (type === "withdraw") return "text-orange-600 bg-orange-50";
    if (type === "bet_stake") return "text-purple-600 bg-purple-50";
    if (type === "winnings") return "text-green-600 bg-green-50";
    return "text-slate-600 bg-slate-50";
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">
            Financial Management
          </h1>
          <p className="text-slate-400 text-sm">
            Monitor platform liquidity and user transactions.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>{" "}
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <FinanceCard
          label="Total Transactions"
          value={allTxRes?.data?.meta?.total?.toString() || "0"}
          trend="All time"
        />
        <FinanceCard
          label="Total Deposits"
          value={totalDeposits.toString()}
          trend="All deposits"
        />
        <FinanceCard
          label="Pending Withdrawals"
          value={pendingCount.toString()}
          subValue={`${pendingCount} items`}
          isAlert={pendingCount > 0}
        />
        <FinanceCard
          label="Withdrawal Requests"
          value={withdrawTxRes?.data?.meta?.total?.toString() || "0"}
          trend="All withdrawals"
        />
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="flex border-b border-gray-100 px-6 gap-8 overflow-x-auto no-scrollbar">
          {(["all", "deposit", "withdraw"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 border-b-2 text-sm font-bold whitespace-nowrap transition-colors capitalize ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-primary"
              }`}
            >
              {tab === "all"
                ? "All Transactions"
                : tab === "deposit"
                  ? "Deposits"
                  : "Withdrawals"}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-6 py-3">
                      <Skeleton className="h-10 w-full" />
                    </td>
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-slate-400 font-medium"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx: any) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">
                      {tx.transactionId}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold">
                        {tx.user?.fullName || tx.user?.name || "N/A"}
                      </p>
                      <p className="text-xs text-slate-400">{tx.user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getTypeColor(tx.type)}`}
                      >
                        {tx.type?.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-sm">
                      ${tx.amount?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(tx.status)}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {moment(tx.createdAt).format("MMM D, YYYY HH:mm")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FinanceCard = ({ label, value, trend, subValue, isAlert }: any) => (
  <div
    className={`bg-white p-5 rounded-xl border ${isAlert ? "border-l-4 border-l-red-500" : "border-gray-200"} shadow-sm`}
  >
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
      {label}
    </p>
    <div className="flex items-end justify-between mt-2">
      <h3 className="text-2xl font-black">{value}</h3>
      {trend ? (
        <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded">
          {trend}
        </span>
      ) : (
        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
          {subValue}
        </span>
      )}
    </div>
  </div>
);

export default Financials;
