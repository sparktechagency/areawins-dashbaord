import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import React from "react";

interface TransactionTableProps {
  transactions: any[];
  isLoading: boolean;
}

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

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  isLoading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-[11px] font-extrabold text-gray-400 tracking-widest border-b border-gray-100">
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
              <tr key={tx._id} className="hover:bg-slate-50 transition-colors">
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
                    className={`px-2 py-1 rounded text-[10px] font-bold ${getTypeColor(tx.type)}`}
                  >
                    {tx.type?.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-sm">
                  ${tx.amount?.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold ${getStatusColor(tx.status)}`}
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
  );
};

export default TransactionTable;
