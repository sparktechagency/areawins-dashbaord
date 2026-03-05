import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetActivityQuery } from "@/redux/features/dashboard/dashboardApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const RecentBets = () => {
  const { data: activityRes, isLoading } = useGetActivityQuery({});
  const recentBets = activityRes?.data?.recentBets || [];

  if (isLoading) {
    return (
      <Card className="xl:col-span-3 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bets</CardTitle>
          <Skeleton className="h-4 w-16" />
        </CardHeader>
        <CardContent className="p-0">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full mb-1" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
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
                <TableHead className="pl-6">ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="text-right">Stake</TableHead>
                <TableHead className="pr-6 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBets.length > 0 ? (
                recentBets.map((bet: any) => (
                  <TableRow key={bet._id}>
                    <TableCell className="pl-6 font-bold truncate max-w-[100px]">
                      {bet.betId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {bet.creator?.name || "N/A"}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {bet.match
                        ? `${bet.match.homeTeam?.name || "Team A"} vs ${bet.match.awayTeam?.name || "Team B"}`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      ${bet.stakeAmount?.toFixed(2)}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Badge
                        className="uppercase"
                        variant={
                          bet.status === "won" || bet.status === "settled"
                            ? "success"
                            : bet.status === "lost"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {bet.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-slate-500"
                  >
                    No recent bets found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBets;
