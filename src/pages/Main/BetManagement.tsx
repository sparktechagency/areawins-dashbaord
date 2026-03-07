import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCancelBetMutation,
  useGetAllBetsQuery,
  useRefundBetMutation,
  useSettleBetMutation,
} from "@/redux/features/bet/betApi";
import React, { useState } from "react";
import { toast } from "sonner";

const BetManagement: React.FC = () => {
  const [selectedBet, setSelectedBet] = useState<any | null>(null);
  const [winnerUserId, setWinnerUserId] = useState("");

  const { data: betsRes, isLoading } = useGetAllBetsQuery({});
  const [settleBet, { isLoading: isSettling }] = useSettleBetMutation();
  const [cancelBet, { isLoading: isCancelling }] = useCancelBetMutation();
  const [refundBet, { isLoading: isRefunding }] = useRefundBetMutation();

  const bets = betsRes?.data?.results || [];

  const handleAction = async (action: string) => {
    if (!selectedBet) return;
    try {
      if (action === "settled") {
        if (!winnerUserId) {
          toast.error("Please enter the winner user ID");
          return;
        }
        await settleBet({
          id: selectedBet._id,
          data: { winnerUser: winnerUserId },
        }).unwrap();
        toast.success("Bet settled successfully");
      } else if (action === "cancelled") {
        await cancelBet(selectedBet._id).unwrap();
        toast.success("Bet cancelled successfully");
      } else if (action === "refunded") {
        await refundBet(selectedBet._id).unwrap();
        toast.success("Bet refunded successfully");
      }
      setSelectedBet(null);
      setWinnerUserId("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  const getBadgeVariant = (status: string) => {
    if (status === "settled" || status === "matched") return "default";
    if (status === "open") return "secondary";
    return "destructive";
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-3xl font-black tracking-tight text-primary">
          Bet Oversight
        </h2>
        <p className="text-gray-500 font-medium">
          Monitor market activity and manually override results if necessary.
        </p>
      </div>

      <Dialog
        open={!!selectedBet}
        onOpenChange={() => {
          setSelectedBet(null);
          setWinnerUserId("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Override Bet Result</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Managing bet{" "}
              <span className="font-mono text-primary font-bold">
                {selectedBet?.betId}
              </span>
              . Status:{" "}
              <Badge
                className=""
                variant={getBadgeVariant(selectedBet?.status)}
              >
                {selectedBet?.status}
              </Badge>
            </p>

            {selectedBet?.status === "matched" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Winner User ID (for settle)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Enter winner's user ID..."
                  value={winnerUserId}
                  onChange={(e) => setWinnerUserId(e.target.value)}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {selectedBet?.status === "matched" && (
                <Button
                  onClick={() => handleAction("settled")}
                  disabled={isSettling}
                  className="capitalize"
                >
                  {isSettling ? "Settling..." : "Settle"}
                </Button>
              )}
              {selectedBet?.status === "open" && (
                <Button
                  variant="outline"
                  onClick={() => handleAction("cancelled")}
                  disabled={isCancelling}
                  className="capitalize"
                >
                  {isCancelling ? "Cancelling..." : "Cancel"}
                </Button>
              )}
              {selectedBet?.status === "matched" && (
                <Button
                  variant="outline"
                  onClick={() => handleAction("refunded")}
                  disabled={isRefunding}
                  className="capitalize"
                >
                  {isRefunding ? "Refunding..." : "Refund"}
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedBet(null);
                setWinnerUserId("");
              }}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-black text-gray-400  tracking-wider">
                  Bet ID
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400  tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400  tracking-wider">
                  Selection
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400  tracking-wider text-right">
                  Stake
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400  tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400  tracking-wider text-center">
                  Action
                </th>
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
                        className=" font-bold text-[10px]"
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
                        className=" text-[10px]"
                      >
                        {bet.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedBet(bet)}
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
    </div>
  );
};

export default BetManagement;
