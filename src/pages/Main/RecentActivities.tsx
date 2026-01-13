import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui";
import React from "react";
import ActivityItem from "./ActivityItem";

const RecentActivities = () => {
  return (
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
                System updated <span className="font-bold">Premier League</span>{" "}
                live odds
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
  );
};

export default RecentActivities;
