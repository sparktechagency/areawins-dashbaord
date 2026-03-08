import React from "react";
import GatewayCard from "./GatewayCard";

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Platform Settings
          </h1>
          <p className="text-gray-500">
            Global configurations for the AreaWins Bet ecosystem.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded text-sm font-bold hover:bg-slate-200">
            Discard
          </button>
          <button className="px-8 py-2.5 bg-primary text-white rounded text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110">
            Save Changes
          </button>
        </div>
      </div>

      {/* Commission & Fees */}
      <section className="bg-white rounded border border-gray-200  overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            percent
          </span>
          <h2 className="text-xl font-bold">Commission &amp; Fees</h2>
        </div>
        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Customer Commission (%)
              </label>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                5.0%
              </span>
            </div>
            <input
              type="range"
              className="w-full accent-primary"
              defaultValue="25"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 tracking-widest">
                Min Bet Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  $
                </span>
                <input
                  className="w-full h-12 pl-8 bg-slate-50 border-none rounded font-bold focus:ring-1 focus:ring-primary"
                  defaultValue="5.00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 tracking-widest">
                Max Bet Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  $
                </span>
                <input
                  className="w-full h-12 pl-8 bg-slate-50 border-none rounded font-bold focus:ring-1 focus:ring-primary"
                  defaultValue="10,000.00"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Gateways */}
      <section className="bg-white rounded border border-gray-200  overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            credit_card
          </span>
          <h2 className="text-xl font-bold">Active Gateways</h2>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <GatewayCard
            title="Stripe"
            icon="credit_card"
            status="Active"
            color="bg-blue-600"
          />
          <GatewayCard
            title="Crypto Payments"
            icon="currency_bitcoin"
            status="Paused"
            color="bg-orange-500"
          />
        </div>
      </section>
    </div>
  );
};

export default Settings;
