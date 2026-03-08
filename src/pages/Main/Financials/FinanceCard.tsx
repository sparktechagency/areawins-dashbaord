import React from "react";

interface FinanceCardProps {
  label: string;
  value: string;
  trend?: string;
  subValue?: string;
  isAlert?: boolean;
}

const FinanceCard: React.FC<FinanceCardProps> = ({
  label,
  value,
  trend,
  subValue,
  isAlert,
}) => (
  <div
    className={`bg-white p-5 rounded border ${
      isAlert ? "border-l-4 border-l-red-500" : "border-gray-200"
    } `}
  >
    <p className="text-xs font-bold text-gray-400 tracking-wider">{label}</p>
    <div className="flex items-end justify-between mt-2">
      <h3 className="text-2xl font-black">{value}</h3>
      {trend ? (
        <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded">
          {trend}
        </span>
      ) : (
        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
          {subValue}
        </span>
      )}
    </div>
  </div>
);

export default FinanceCard;
