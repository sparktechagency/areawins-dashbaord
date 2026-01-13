import React, { useState } from "react";
import { Bet } from "../../types";

const initialBets: Bet[] = [
  {
    id: "#BT-98210",
    user: "john_doe92",
    sport: "Soccer",
    event: "Liverpool vs Real Madrid",
    stake: 450,
    status: "OPEN",
    type: "BACK",
    timestamp: "Today, 21:00",
  },
  {
    id: "#BT-98192",
    user: "sam_smith",
    sport: "NBA",
    event: "Lakers vs Warriors",
    stake: 1200,
    status: "MATCHED",
    type: "LAY",
    timestamp: "Today, 04:30",
  },
  {
    id: "#BT-98155",
    user: "emma_v",
    sport: "Tennis",
    event: "Djokovic vs Alcaraz",
    stake: 80,
    status: "SETTLED",
    type: "BACK",
    timestamp: "Yesterday",
  },
  {
    id: "#BT-98100",
    user: "lucas_p",
    sport: "Soccer",
    event: "Arsenal vs Chelsea",
    stake: 300,
    status: "PENDING",
    type: "BACK",
    timestamp: "Today, 18:00",
  },
];

const BetManagement: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>(initialBets);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);

  const overrideBetResult = (betId: string, newStatus: Bet["status"]) => {
    setBets((prev) =>
      prev.map((bet) =>
        bet.id === betId ? { ...bet, status: newStatus } : bet
      )
    );
    setSelectedBet(null);
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

      {/* Override Modal (Simulated) */}
      {selectedBet && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-2">Override Result</h3>
            <p className="text-gray-500 text-sm mb-6">
              You are about to manually change the result for bet{" "}
              <span className="font-mono text-primary font-bold">
                {selectedBet.id}
              </span>
              . This action will be logged.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {["WON", "LOST", "CANCELLED", "SETTLED", "PENDING"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() =>
                      overrideBetResult(selectedBet.id, status as Bet["status"])
                    }
                    className="py-3 px-4 bg-gray-50 hover:bg-secondary hover:text-primary transition-all rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600"
                  >
                    {status}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setSelectedBet(null)}
              className="w-full py-3 text-gray-400 font-bold hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Bet ID
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Match & Event
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Type
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
              {bets.map((bet) => (
                <tr
                  key={bet.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">
                    {bet.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-primary leading-tight">
                      {bet.event}
                    </p>
                    <p className="text-xs text-gray-400">
                      {bet.sport} • {bet.timestamp}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black uppercase text-gray-600">
                      {bet.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-slate-900 text-right">
                    ${bet.stake.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        bet.status === "WON"
                          ? "bg-green-100 text-green-700"
                          : bet.status === "LOST"
                          ? "bg-red-100 text-red-700"
                          : bet.status === "CANCELLED"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {bet.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedBet(bet)}
                      className="text-xs font-bold bg-primary text-accent px-3 py-1.5 rounded hover:bg-black transition-all"
                    >
                      OVERRIDE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BetManagement;
