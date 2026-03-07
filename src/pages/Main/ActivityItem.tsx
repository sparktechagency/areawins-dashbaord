const ActivityItem = ({ icon, color, text, time }: any) => (
  <div className="flex gap-4">
    <div
      className={`size-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0`}
    >
      <span className={`material-symbols-outlined ${color} text-lg`}>
        {icon}
      </span>
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="text-[11px] md:text-xs font-medium text-slate-900 leading-tight">
        {text}
      </p>
      <span className="text-[9px] md:text-[10px] text-slate-400 font-bold ">
        {time}
      </span>
    </div>
  </div>
);

export default ActivityItem;
