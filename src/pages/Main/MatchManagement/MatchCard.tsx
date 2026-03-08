import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

interface MatchCardProps {
  match: any;
  sports: any[];
  tournaments: any[];
  teams: any[];
  onEdit: (match: any) => void;
  onDelete: (id: string) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  match: m,
  sports,
  tournaments,
  teams,
  onEdit,
  onDelete,
}) => {
  const getSportName = (id: string) =>
    sports.find((s: any) => s._id === id)?.name || "Unknown";
  const getTournamentName = (id?: string) =>
    id
      ? tournaments.find((t: any) => t._id === id)?.name || "Friendly"
      : "Friendly/Other";
  const getTeam = (id: string) => teams.find((t: any) => t._id === id);

  const home = getTeam(m.homeTeam?._id || m.homeTeam);
  const away = getTeam(m.awayTeam?._id || m.awayTeam);
  const homeTeamData = m.homeTeam?._id ? m.homeTeam : home;
  const awayTeamData = m.awayTeam?._id ? m.awayTeam : away;

  return (
    <Card className={m.status === "finished" ? "opacity-80" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline">
            {getSportName(m.sport?._id || m.sport)}
          </Badge>
          <Badge
            className={
              m.status === "live"
                ? "bg-red-500 animate-pulse text-white"
                : "bg-slate-100 text-slate-600"
            }
          >
            {m.status?.toUpperCase()}
          </Badge>
        </div>
        <div className="text-xs text-center text-slate-400 font-bold tracking-wider mb-4">
          {getTournamentName(m.tournament?._id || m.tournament)}
        </div>
        <div className="flex justify-between items-center px-4">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2 w-1/3">
            <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center p-2 border">
              {homeTeamData?.logo ? (
                <img
                  src={homeTeamData.logo}
                  className="w-full h-full object-contain"
                  alt=""
                />
              ) : (
                "🏠"
              )}
            </div>
            <span className="text-xs  text-center leading-tight">
              {homeTeamData?.name || "Home"}
            </span>
          </div>
          {/* Score / VS */}
          <div className="flex flex-col items-center">
            <div className="text-3xl  tabular-nums">
              {m.status === "live" || m.status === "finished"
                ? `${m.liveStatus?.homeScore ?? 0} - ${m.liveStatus?.awayScore ?? 0}`
                : "VS"}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {new Date(m.scheduledStartTime).toLocaleString()}
            </div>
          </div>
          {/* Away Team */}
          <div className="flex flex-col items-center gap-2 w-1/3">
            <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center p-2 border">
              {awayTeamData?.logo ? (
                <img
                  src={awayTeamData.logo}
                  className="w-full h-full object-contain"
                  alt=""
                />
              ) : (
                "✈️"
              )}
            </div>
            <span className="text-xs  text-center leading-tight">
              {awayTeamData?.name || "Away"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
          <div className="text-xs text-slate-400 font-mono">{m.matchId}</div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(m)}>
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => onDelete(m._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
