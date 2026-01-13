
import React from 'react';

const Financials: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Financial Management</h1>
          <p className="text-slate-400 text-sm">Monitor platform liquidity and process user payouts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm transition-colors">
            <span className="material-symbols-outlined text-sm">download</span> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-accent rounded-lg text-sm font-bold shadow-lg shadow-green-500/10 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-sm">bolt</span> Process Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <FinanceCard label="Today's Revenue" value="$12,450.00" trend="+12.5%" />
        <FinanceCard label="Monthly Revenue" value="$340,200.00" trend="+4.2%" />
        <FinanceCard label="Pending Withdrawals" value="$8,230.00" subValue="24 items" isAlert />
        <FinanceCard label="Platform Balance" value="$1,240,500.00" trend="+0.8%" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="flex border-b border-gray-100 px-6 gap-8 overflow-x-auto no-scrollbar">
          <button className="py-4 border-b-2 border-transparent text-sm font-bold text-gray-500 hover:text-primary transition-colors whitespace-nowrap">All Transactions</button>
          <button className="py-4 border-b-2 border-transparent text-sm font-bold text-gray-500 hover:text-primary transition-colors whitespace-nowrap">Deposits</button>
          <button className="py-4 border-b-2 border-primary text-sm font-bold text-primary whitespace-nowrap">Withdrawals Approval Queue</button>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            High-Risk Payout Review
          </h2>
          <div className="space-y-4">
            <PayoutRow name="Alex Thompson" id="#99281-W" amount="$2,450.00" method="Crypto (BTC)" score={98} status="Verified" />
            <PayoutRow name="Marcus Chen" id="#99285-Z" amount="$450.00" method="Bank Transfer" score={62} status="Level 1" />
            <PayoutRow name="Sarah Vane" id="#99290-A" amount="$5,100.00" method="Crypto (USDT)" score={31} status="Pending" canApprove={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

const FinanceCard = ({ label, value, trend, subValue, isAlert }: any) => (
  <div className={`bg-white p-5 rounded-xl border ${isAlert ? 'border-l-4 border-l-red-500' : 'border-gray-200'} shadow-sm`}>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    <div className="flex items-end justify-between mt-2">
      <h3 className="text-2xl font-black">{value}</h3>
      {trend ? (
        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">{trend}</span>
      ) : (
        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{subValue}</span>
      )}
    </div>
  </div>
);

const PayoutRow = ({ name, id, amount, method, score, status, canApprove = true }: any) => (
  <div className="bg-slate-50 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 group hover:bg-slate-100 transition-colors">
    <div className="flex items-center gap-3 min-w-[180px]">
      <div className="size-8 rounded bg-gray-200"></div>
      <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-[10px] text-gray-400">ID: {id}</p>
      </div>
    </div>
    <div className="min-w-[120px]">
      <p className="text-sm font-black">{amount}</p>
      <p className="text-[10px] text-gray-400">{method}</p>
    </div>
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${score > 80 ? 'bg-accent' : score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }}></div>
      </div>
      <span className={`text-xs font-bold ${score > 80 ? 'text-accent' : score > 50 ? 'text-yellow-600' : 'text-red-600'}`}>{score}</span>
    </div>
    <div className="flex gap-2">
      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><span className="material-symbols-outlined text-lg">close</span></button>
      <button className={`px-4 py-1 rounded text-xs font-bold shadow-sm transition-all ${canApprove ? 'bg-primary text-white hover:brightness-110' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
        {canApprove ? 'Approve' : 'Review'}
      </button>
    </div>
  </div>
);

export default Financials;
