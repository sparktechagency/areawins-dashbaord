
import React from 'react';

const Promotions: React.FC = () => {
  const promos = [
    { title: 'Welcome Bonus 100%', type: 'New User', reach: '1.2k users', status: 'Active', color: 'bg-green-500' },
    { title: 'Weekend Cashback', type: 'Retention', reach: '540 users', status: 'Scheduled', color: 'bg-blue-500' },
    { title: 'VIP High Roller', type: 'Special', reach: '12 users', status: 'Paused', color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Promotions & Campaigns</h1>
          <p className="text-gray-500">Create incentives to drive user engagement and volume.</p>
        </div>
        <button className="bg-accent text-primary px-6 py-2.5 rounded-lg text-sm font-black shadow-lg shadow-green-500/10 hover:brightness-110">
           New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {promos.map((promo, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className={`h-2 ${promo.color}`}></div>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider bg-gray-50 px-2 py-1 rounded">{promo.type}</span>
                <span className={`text-[10px] font-bold ${promo.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{promo.status}</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{promo.title}</h3>
              <p className="text-sm text-gray-500 mb-6">Automated delivery triggered by account registration or seasonal events.</p>
              
              <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Impact Reach</p>
                  <p className="font-black text-slate-800">{promo.reach}</p>
                </div>
                <button className="size-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                  <span className="material-symbols-outlined">analytics</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
