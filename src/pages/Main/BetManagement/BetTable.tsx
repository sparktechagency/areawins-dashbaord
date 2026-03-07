import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface BetTableProps {
  bets: any[];
  isLoading: boolean;
  onManage: (bet: any) => void;
}

const getBadgeVariant = (status: string) => {
  if (status === "settled" || status === "matched") return "default";
  if (status === "open") return "secondary";
  return "destructive";
};

const BetTable: React.FC<BetTableProps> = ({ bets, isLoading, onManage }) => {
  return (
    <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {[
                "Bet ID",
                "Creator",
                "Selection",
                "Stake",
                "Status",
                "Action",
              ].map((col, i) => (
                <th
                  key={col}
                  className={`px-6 py-4 text-xs font-black text-gray-400 tracking-wider ${
                    col === "Stake"
                      ? "text-right"
                      : col === "Action"
                        ? "text-center"
                        : ""
                  }`}
                >
                  {col}
                </th>
              ))}
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
            ) : bets.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-slate-400 font-medium"
                >
                  No bets found.
                </td>
              </tr>
            ) : (
              bets.map((bet: any) => (
                <tr
                  key={bet._id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">
                    {bet.betId}
                    <div className="text-[10px] text-slate-300 font-normal">
                      {new Date(bet.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bet.creator?.name || bet.creator?.fullName || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className="font-bold text-[10px]"
                    >
                      {bet.selectedOutcome}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-slate-900 text-right">
                    ${bet.stakeAmount?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={getBadgeVariant(bet.status)}
                      className="text-[10px]"
                    >
                      {bet.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onManage(bet)}
                      className="text-xs font-bold text-primary hover:bg-primary/10"
                      disabled={
                        bet.status === "settled" ||
                        bet.status === "refunded" ||
                        bet.status === "cancelled"
                      }
                    >
                      Manage
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetTable;
