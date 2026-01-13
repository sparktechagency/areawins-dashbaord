import React from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Bet } from "../../../types";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui";
import OverView from "./OverView";
import RevenueChart from "./RevenueChart";
import RecentBets from "./RecentBets";

const pieData = [
  { name: "Soccer", value: 65, color: "#00D65C" },
  { name: "Basketball", value: 20, color: "#141414" },
  { name: "Other", value: 15, color: "#e0e0e0" },
];

const recentBets: Bet[] = [
  {
    id: "#u9283",
    user: "u9283",
    sport: "Soccer",
    event: "Luton vs Man City",
    stake: 250,
    status: "WON",
    type: "BACK",
    timestamp: "2 mins ago",
  },
  {
    id: "#u1105",
    user: "u1105",
    sport: "Tennis",
    event: "Djokovic vs Alcaraz",
    stake: 1200,
    status: "PENDING",
    type: "BACK",
    timestamp: "5 mins ago",
  },
  {
    id: "#u8821",
    user: "u8821",
    sport: "NBA",
    event: "Lakers vs Celtics",
    stake: 50,
    status: "LOST",
    type: "LAY",
    timestamp: "14 mins ago",
  },
  {
    id: "#u3392",
    user: "u3392",
    sport: "Soccer",
    event: "Real Madrid vs Girona",
    stake: 10,
    status: "PENDING",
    type: "BACK",
    timestamp: "1 hour ago",
  },
];

const Dashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = React.useState<string>("");
  const [loadingAi, setLoadingAi] = React.useState(false);

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
      <OverView />

      {/* Main Revenue Chart */}
      <RevenueChart />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-8">
        {/* Recent Bets */}
        <RecentBets />

        {/* Right Distribution & Activity */}
        <div className="xl:col-span-2 flex flex-col gap-6 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Market Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="size-28 md:size-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={30}
                        outerRadius={45}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 flex flex-col gap-2 w-full">
                  {pieData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-xs font-bold text-slate-600">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-sm">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <ActivityItem
                  icon="check_circle"
                  color="text-[#00D65C]"
                  text={
                    <>
                      Admin <span className="font-bold">John Doe</span> approved
                      withdrawal{" "}
                      <span className="text-[#00D65C] font-mono">#W7721</span>
                    </>
                  }
                  time="2 MINUTES AGO"
                />
                <ActivityItem
                  icon="trending_up"
                  color="text-slate-900"
                  text={
                    <>
                      System updated{" "}
                      <span className="font-bold">Premier League</span> live
                      odds
                    </>
                  }
                  time="14 MINUTES AGO"
                />
                <ActivityItem
                  icon="report"
                  color="text-red-500"
                  text={
                    <>
                      Suspicious activity detected on user{" "}
                      <span className="font-bold">#u9921</span>
                    </>
                  }
                  time="1 HOUR AGO"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

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
      <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">
        {time}
      </span>
    </div>
  </div>
);

export default Dashboard;
