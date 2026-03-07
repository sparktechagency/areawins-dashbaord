import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const StatCard = ({ title, value, trend, trendText, icon, isAlert }: any) => (
  <Card
    className={`${
      isAlert ? "border-l-4 border-l-red-500" : ""
    } hover:border-[#00D65C] transition-all`}
  >
    <CardHeader className="flex flex-row items-start justify-between pb-2">
      <CardDescription className=" font-bold tracking-wider text-[10px] md:text-[12px]">
        {title}
      </CardDescription>
      <div
        className={`p-1.5 md:p-2.5 rounded ${
          isAlert ? "bg-red-50 text-red-500" : "bg-[#00D65C]/10 text-[#00D65C]"
        }`}
      >
        <span className="material-symbols-outlined text-base md:text-xl">
          {icon}
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
        {value}
      </h2>
      <div className="flex items-center gap-1 mt-1 md:mt-2">
        <span
          className={`${
            trend.includes("+") ? "text-[#00D65C]" : "text-red-500"
          } text-[10px] md:text-xs font-bold`}
        >
          {trend}
        </span>
        <span className="text-slate-400 text-[9px] md:text-[10px] font-medium">
          {trendText}
        </span>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
