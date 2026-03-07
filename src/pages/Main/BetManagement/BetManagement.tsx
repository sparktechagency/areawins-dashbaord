import {
  useCancelBetMutation,
  useGetAllBetsQuery,
  useRefundBetMutation,
  useSettleBetMutation,
} from "@/redux/features/bet/betApi";
import React, { useState } from "react";
import { toast } from "sonner";
import BetActionDialog from "./BetActionDialog";
import BetTable from "./BetTable";

const BetManagement: React.FC = () => {
  const [selectedBet, setSelectedBet] = useState<any | null>(null);

  const { data: betsRes, isLoading } = useGetAllBetsQuery({});
  const [settleBet, { isLoading: isSettling }] = useSettleBetMutation();
  const [cancelBet, { isLoading: isCancelling }] = useCancelBetMutation();
  const [refundBet, { isLoading: isRefunding }] = useRefundBetMutation();

  const bets = betsRes?.data?.results || [];

  const handleAction = async (action: string, winnerUserId?: string) => {
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
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-3xl font-black tracking-tight text-primary">
          Bet Oversight
        </h2>
        <p className="text-gray-500 font-medium">
          Monitor market activity and manually override results if necessary.
        </p>
      </div>

      <BetTable bets={bets} isLoading={isLoading} onManage={setSelectedBet} />

      <BetActionDialog
        bet={selectedBet}
        isSettling={isSettling}
        isCancelling={isCancelling}
        isRefunding={isRefunding}
        onAction={handleAction}
        onClose={() => setSelectedBet(null)}
      />
    </div>
  );
};

export default BetManagement;
