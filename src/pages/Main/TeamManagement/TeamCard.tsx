import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface TeamCardProps {
  team: any;
  getSportName: (id: string) => string;
  onEdit: (team: any) => void;
  onDelete: (team: any) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  team: t,
  getSportName,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className={!t.isActive ? "opacity-60 grayscale" : ""}>
      <CardHeader className="flex flex-col items-center pb-2">
        <div className="size-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 overflow-hidden ">
          {t.logo && t.logo.startsWith("http") ? (
            <img
              src={t.logo}
              alt={t.name}
              className="w-16 h-16 object-contain"
            />
          ) : (
            <span className="text-4xl">{t.logo || "🛡️"}</span>
          )}
        </div>
        <Badge variant="outline" className="text-xs mb-1">
          {getSportName(t.sport?._id || t.sport)}
        </Badge>
        <CardTitle className="text-xl font-black text-center">
          {t.name}
        </CardTitle>
        <span className="text-sm font-bold text-slate-400">{t.shortName}</span>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-50">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(t)}>
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => onDelete(t)}
            >
              Delete
            </Button>
          </div>
          <Badge variant={t.isActive ? "secondary" : "outline"}>
            {t.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
