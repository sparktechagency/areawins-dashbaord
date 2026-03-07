import React from "react";

interface GatewayCardProps {
  title: string;
  icon: string;
  status: string;
  color: string;
}

const GatewayCard: React.FC<GatewayCardProps> = ({
  title,
  icon,
  status,
  color,
}) => (
  <div className="p-5 border border-slate-100 rounded hover:border-primary/50 transition-all group flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div
        className={`size-10 ${color} rounded flex items-center justify-center text-white`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-800">{title}</h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`size-1.5 rounded-full ${
              status === "Active" ? "bg-secondary" : "bg-slate-300"
            }`}
          />
          <span className="text-[10px] font-black tracking-tighter text-slate-400">
            {status}
          </span>
        </div>
      </div>
    </div>
    <button className="material-symbols-outlined text-gray-400 hover:text-primary">
      settings
    </button>
  </div>
);

export default GatewayCard;
