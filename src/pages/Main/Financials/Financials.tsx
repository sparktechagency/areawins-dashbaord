import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import React, { useState } from "react";
import FinanceCard from "./FinanceCard";
import TransactionTable from "./TransactionTable";

type TabType = "all" | "deposit" | "withdraw";

const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");

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

  const transactions = currentData?.results || [];
  const isLoading = loadingAll || loadingDeposits || loadingWithdrawals;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl  tracking-tight">Financial Management</h1>
          <p className="text-slate-400 text-sm">
            Monitor platform liquidity and user transactions.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded text-sm font-bold hover:bg-gray-50  transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <FinanceCard
          label="Total Transactions"
          value={allTxRes?.data?.pagination?.totalResult?.toString() || "0"}
          trend="All time"
        />
        <FinanceCard
          label="Total Deposits"
          value={depositTxRes?.data?.pagination?.totalResult?.toString() || "0"}
          trend="All deposits"
        />
        <FinanceCard
          label="Pending Withdrawals"
          value={
            pendingWithdrawalsRes?.data?.pagination?.totalResult?.toString() ||
            "0"
          }
          subValue="items"
          isAlert={
            (pendingWithdrawalsRes?.data?.pagination?.totalResult || 0) > 0
          }
        />
        <FinanceCard
          label="Withdrawal Requests"
          value={
            withdrawTxRes?.data?.pagination?.totalResult?.toString() || "0"
          }
          trend="All withdrawals"
        />
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded border border-gray-200  flex flex-col overflow-hidden">
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
        <TransactionTable transactions={transactions} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Financials;
