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
import GeminiService from "../../../services/geminiService";
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

const data = [
  { name: "Jan 01", revenue: 4000 },
  { name: "Jan 07", revenue: 3000 },
  { name: "Jan 14", revenue: 5000 },
  { name: "Jan 21", revenue: 2780 },
  { name: "Jan 28", revenue: 4890 },
  { name: "Jan 31", revenue: 6390 },
];

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

  const getAiInsight = async () => {
    setLoadingAi(true);
    const insight = await GeminiService.generateDashboardInsight({
      revenue: "$128,430",
      activeUsers: "14,205",
      activeBets: "3,842",
      pendingWithdrawals: "42",
    });
    setAiInsight(insight);
    setLoadingAi(false);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Revenue"
          value="$128,430"
          trend="+12.5%"
          trendText="vs last month"
          icon="monetization_on"
          iconColor="accent"
        />
        <StatCard
          title="Active Users"
          value="14,205"
          trend="+5.2%"
          trendText="real-time"
          icon="person_celebrate"
        />
        <StatCard
          title="Active Bets"
          value="3,842"
          trend="+8.1%"
          trendText="live volume"
          icon="receipt_long"
        />
        <StatCard
          title="Pending Withdrawals"
          value="42"
          trend="High Priority"
          trendText="Requires action"
          icon="priority_high"
          isAlert
        />
      </div>

      {/* AI Section */}
      <Card className="border-l-4 border-l-[#00D65C]">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00D65C]">
              auto_awesome
            </span>
            <CardTitle>Gemini AI Smart Insights</CardTitle>
          </div>
          <Button
            variant="accent"
            size="sm"
            onClick={getAiInsight}
            disabled={loadingAi}
            className="w-full sm:w-auto"
          >
            {loadingAi ? "Analyzing..." : "Generate Insights"}
          </Button>
        </CardHeader>
        <CardContent>
          {aiInsight ? (
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "{aiInsight}"
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              Click generate to see platform insights powered by Gemini AI.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Main Revenue Chart */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>
              Daily financial performance overview
            </CardDescription>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              WEEKLY
            </Button>
            <Button variant="default" size="sm" className="flex-1 sm:flex-none">
              MONTHLY
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D65C" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00D65C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#9ca3af" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00D65C"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-8">
        {/* Recent Bets */}
        <Card className="xl:col-span-3 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bets</CardTitle>
            <Button
              variant="link"
              className="text-[#00D65C] p-0 h-auto text-xs md:text-sm"
            >
              VIEW ALL
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">User</TableHead>
                    <TableHead>Sport</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead className="text-right">Stake</TableHead>
                    <TableHead className="pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBets.map((bet) => (
                    <TableRow key={bet.id}>
                      <TableCell className="pl-6 font-bold">{bet.id}</TableCell>
                      <TableCell>{bet.sport}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {bet.event}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold">
                        ${bet.stake.toFixed(2)}
                      </TableCell>
                      <TableCell className="pr-6">
                        <Badge
                          variant={
                            bet.status === "WON"
                              ? "success"
                              : bet.status === "LOST"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {bet.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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

const StatCard = ({ title, value, trend, trendText, icon, isAlert }: any) => (
  <Card
    className={`${
      isAlert ? "border-l-4 border-l-red-500" : ""
    } hover:border-[#00D65C] transition-all`}
  >
    <CardHeader className="flex flex-row items-start justify-between pb-2">
      <CardDescription className="uppercase font-bold tracking-wider text-[9px] md:text-[10px]">
        {title}
      </CardDescription>
      <div
        className={`p-1.5 md:p-2 rounded-lg ${
          isAlert ? "bg-red-50 text-red-500" : "bg-[#00D65C]/10 text-[#00D65C]"
        }`}
      >
        <span className="material-symbols-outlined text-base md:text-lg">
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
