
import React from 'react';

const AuditLogs: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white overflow-y-auto p-4 lg:p-6 flex flex-col gap-6 custom-scrollbar shrink-0">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Filters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold mb-1.5 block">Date Range</label>
              <input className="w-full text-sm border-gray-200 rounded-lg focus:ring-primary focus:border-primary" defaultValue="Oct 01 - Oct 31, 2023" />
            </div>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Admin User</label>
              <select className="w-full text-sm border-gray-200 rounded-lg focus:ring-primary">
                <option>All Administrators</option>
                <option>Sarah Jenkins</option>
                <option>Alex Rivera</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold mb-1.5 block uppercase opacity-50 tracking-tighter">Action Type</label>
            <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-2">
              {['Create', 'Delete', 'Update', 'Login'].map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer bg-slate-50 lg:bg-transparent px-3 py-1.5 lg:p-0 rounded-full lg:rounded-none">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                  <span className="text-sm text-slate-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button className="w-full py-3 bg-slate-50 text-primary font-bold text-sm rounded-lg hover:bg-slate-100 transition-all mt-2 lg:mt-auto">Reset Filters</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="p-4 lg:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
          <div>
            <h2 className="text-xl lg:text-2xl font-black tracking-tight">Audit Logs</h2>
            <p className="text-gray-400 text-[10px] lg:text-xs mt-1">12,482 total records • Last 30 days</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 bg-slate-50 px-3 py-1.5 rounded-full text-[10px] lg:text-xs font-medium">
             <span className="size-2 bg-green-500 rounded-full animate-pulse"></span> System Online
          </div>
        </div>
        
        <div className="flex-1 overflow-auto custom-scrollbar">
          <div className="min-width-[800px]">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-sm">
                <tr className="bg-slate-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-widest border-b border-gray-100">
                  <th className="px-4 lg:px-8 py-4 text-left">Timestamp</th>
                  <th className="px-4 lg:px-8 py-4 text-left">Admin</th>
                  <th className="px-4 lg:px-8 py-4 text-left">Action</th>
                  <th className="px-4 lg:px-8 py-4 text-right">Entity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <LogEntry time="2023-10-27 14:22" admin="Sarah J." action="CREATE" entity="User #882" color="text-green-600 bg-green-50" />
                <LogEntry time="2023-10-27 14:18" admin="Kevin S." action="DELETE" entity="Bet #AX-20" color="text-red-600 bg-red-50" />
                <LogEntry time="2023-10-27 13:50" admin="Alex R." action="UPDATE" entity="Odds" color="text-blue-600 bg-blue-50" />
                <LogEntry time="2023-10-27 13:42" admin="Sarah J." action="CREATE" entity="Promo #F23" color="text-green-600 bg-green-50" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const LogEntry = ({ time, admin, action, entity, color }: any) => (
  <tr className="hover:bg-slate-50 transition-colors group">
    <td className="px-4 lg:px-8 py-4 font-mono text-[10px] lg:text-[12px] text-gray-500">{time}</td>
    <td className="px-4 lg:px-8 py-4 flex items-center gap-2 lg:gap-3">
      <div className="size-6 lg:size-8 rounded-full bg-slate-200 shrink-0"></div>
      <span className="text-xs lg:text-sm font-bold text-slate-700 truncate max-w-[80px] lg:max-w-none">{admin}</span>
    </td>
    <td className="px-4 lg:px-8 py-4">
      <span className={`px-2 py-0.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-widest border border-current ${color}`}>{action}</span>
    </td>
    <td className="px-4 lg:px-8 py-4 text-right text-[10px] lg:text-xs font-semibold text-slate-500 truncate">{entity}</td>
  </tr>
);

export default AuditLogs;
