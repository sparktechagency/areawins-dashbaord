import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetActivityQuery } from "@/redux/features/dashboard/dashboardApi";
import moment from "moment";
import ActivityItem from "./ActivityItem";

const RecentActivities = () => {
  const { data: activityRes, isLoading } = useGetActivityQuery({});
  const activityData = activityRes?.data;

  if (isLoading) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-sm">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const activities: any[] = [];

  if (activityData?.newUsers) {
    activityData.newUsers.forEach((user: any) => {
      activities.push({
        type: "USER_JOINED",
        icon: "person_add",
        color: "text-blue-500",
        text: (
          <>
            New user{" "}
            <span className="font-bold">{user.fullName || user.name}</span>{" "}
            joined as <span className="capitalize">{user.role}</span>
          </>
        ),
        timestamp: new Date(user.createdAt),
      });
    });
  }

  if (activityData?.recentBets) {
    activityData.recentBets.forEach((bet: any) => {
      activities.push({
        type: "BET_PLACED",
        icon: "receipt_long",
        color: "text-[#00D65C]",
        text: (
          <>
            <span className="font-bold">{bet.creator?.name || "User"}</span>{" "}
            placed a bet of{" "}
            <span className="font-bold">${bet.stakeAmount}</span> on{" "}
            <span className="font-bold">
              {bet.match?.homeTeam?.name} vs {bet.match?.awayTeam?.name}
            </span>
          </>
        ),
        timestamp: new Date(bet.createdAt),
      });
    });
  }

  activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-sm">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {activities.length > 0 ? (
            activities
              .slice(0, 5)
              .map((activity, index) => (
                <ActivityItem
                  key={index}
                  icon={activity.icon}
                  color={activity.color}
                  text={activity.text}
                  time={moment(activity.timestamp).fromNow()}
                />
              ))
          ) : (
            <p className="text-center text-slate-500 text-sm py-4">
              No recent activity
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
