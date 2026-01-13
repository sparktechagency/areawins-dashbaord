import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RevenueChart = () => {
  const data = [
    { name: "Jan 01", revenue: 4000 },
    { name: "Jan 07", revenue: 3000 },
    { name: "Jan 14", revenue: 5000 },
    { name: "Jan 21", revenue: 2780 },
    { name: "Jan 28", revenue: 4890 },
    { name: "Jan 31", revenue: 6390 },
  ];
  return (
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
  );
};

export default RevenueChart;
