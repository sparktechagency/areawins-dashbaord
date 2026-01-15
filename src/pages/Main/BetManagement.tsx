import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  betService,
  betTypeService,
  matchService,
} from "../../services/mockData";
import { Bet, BetStatus, BetType, Match } from "../../types/schema";

const BetManagement: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [betTypes, setBetTypes] = useState<BetType[]>([]);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBets(betService.getAll());
    setMatches(matchService.getAll());
    setBetTypes(betTypeService.getAll());
  };

  const getMatchDetails = (id: string) => matches.find((m) => m._id === id);
  const getBetTypeName = (id: string) =>
    betTypes.find((b) => b._id === id)?.name || "Unknown";

  const overrideBetResult = (betId: string, newStatus: BetStatus) => {
    const updated = betService.update(betId, {
      status: newStatus,
      settledAt: new Date(),
    });
    if (updated) {
      toast.success(`Bet status updated to ${newStatus}`);
      loadData();
      setSelectedBet(null);
    } else {
      toast.error("Failed to update bet status");
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-3xl font-black tracking-tight text-primary">
          Bet Oversight
        </h2>
        <p className="text-gray-500 font-medium">
          Monitor market activity and manually override results if necessary.
        </p>
      </div>

      <Modal
        isOpen={!!selectedBet}
        onClose={() => setSelectedBet(null)}
        title="Override Bet Result"
      >
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            You are about to manually change the result for bet{" "}
            <span className="font-mono text-primary font-bold">
              {selectedBet?.betId}
            </span>
            . This action will be logged.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["matched", "cancelled", "settled", "refunded"].map((status) => (
              <Button
                key={status}
                variant={status === selectedBet?.status ? "default" : "outline"}
                onClick={() =>
                  overrideBetResult(selectedBet!._id, status as BetStatus)
                }
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            onClick={() => setSelectedBet(null)}
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Bet ID
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Match & Type
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Selection
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">
                  Stake
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bets.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-slate-400 font-medium"
                  >
                    No bets found.
                  </td>
                </tr>
              ) : (
                bets.map((bet) => {
                  const match = getMatchDetails(bet.match);
                  return (
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
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-primary leading-tight">
                          {match ? match.matchId : "Unknown Match"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {getBetTypeName(bet.betType)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="secondary"
                          className="uppercase font-bold text-[10px]"
                        >
                          {bet.selectedOutcome}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm text-slate-900 text-right">
                        ${bet.stakeAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            bet.status === "settled" || bet.status === "matched"
                              ? "default"
                              : bet.status === "open"
                              ? "secondary"
                              : "destructive"
                          }
                          className="uppercase text-[10px]"
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
                        >
                          Override
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BetManagement;
