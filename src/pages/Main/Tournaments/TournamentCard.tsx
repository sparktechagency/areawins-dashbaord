import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface TournamentCardProps {
  tournament: any;
  sportName: string;
  onEdit: (t: any) => void;
  onDelete: (id: string) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  sportName,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="size-12 rounded bg-slate-50 flex items-center justify-center border border-slate-100 text-2xl">
          {tournament.logo && tournament.logo.startsWith("http") ? (
            <img
              src={tournament.logo}
              alt={tournament.name}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            tournament.logo || "🏆"
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onEdit(tournament)}
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-red-500 hover:bg-red-50"
            onClick={() => onDelete(tournament._id)}
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle
          className="text-lg font-black mb-1 truncate"
          title={tournament.name}
        >
          {tournament.name}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {sportName}
          </Badge>
          <Badge variant="secondary" className="text-xs ">
            {tournament.type}
          </Badge>
          {tournament.year && (
            <Badge variant="secondary" className="text-xs">
              {tournament.year}
            </Badge>
          )}
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 min-h-8">
          {tournament.description || "No description available."}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs font-mono text-slate-400 pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span>{tournament.startDate || "N/A"}</span>
            <span>{tournament.endDate || "N/A"}</span>
          </div>
          <div className="flex gap-2">
            {tournament.isFeatured && (
              <Badge variant="outline" className="border-accent text-accent">
                Featured
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
