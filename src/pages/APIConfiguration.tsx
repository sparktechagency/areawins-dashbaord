import React from "react";

const APIConfiguration: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">
            API Configuration
          </h2>
          <p className="text-gray-500">
            Manage external sports data integration and sync rules.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">
              description
            </span>{" "}
            Documentation
          </button>
          <button className="bg-primary text-accent px-6 py-2.5 rounded-lg text-sm font-black shadow-lg shadow-green-500/10 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-lg">sync</span> Sync
            Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                hub
              </span>
              <h2 className="text-xl font-bold">Provider Settings</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest">
                    Sports Data Provider
                  </label>
                  <select className="w-full h-12 bg-slate-50 border-none rounded-lg text-sm font-bold focus:ring-1 focus:ring-primary">
                    <option>Sportmonks API v3</option>
                    <option>Sportradar</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest">
                    Base Endpoint URL
                  </label>
                  <input
                    className="w-full h-12 bg-slate-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary font-medium"
                    defaultValue="https://api.sportmonks.com/v3"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest">
                  API Authentication Key
                </label>
                <div className="relative">
                  <input
                    className="w-full h-12 bg-slate-50 border-none rounded-lg text-sm px-4 pr-12 font-mono"
                    type="password"
                    defaultValue="secret_key_8273918237"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button className="bg-primary/10 text-primary px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all">
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-6 shadow-sm">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">
              Connection Health
            </h3>
            <div className="flex items-center gap-4">
              <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <span className="material-symbols-outlined text-2xl animate-pulse">
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-xl font-black">Healthy</p>
                <p className="text-xs text-accent font-bold">99.9% Uptime</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-xs text-gray-500 font-medium">
                  Last Sync
                </span>
                <span className="text-xs font-bold">14:20 Today</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500 font-medium">
                  Next Sync
                </span>
                <span className="text-xs font-bold">20:20 Today</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs text-gray-500 font-medium">
                  Avg Latency
                </span>
                <span className="text-xs font-bold">142ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIConfiguration;
