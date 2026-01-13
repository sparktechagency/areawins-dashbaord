import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Bet } from "../../../types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const RecentBets = () => {
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
  );
};

export default RecentBets;
