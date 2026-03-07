import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface SportCategoryCardProps {
  sport: any;
  onEdit: (sport: any) => void;
  onDelete: (sport: any) => void;
}

const SportCategoryCard: React.FC<SportCategoryCardProps> = ({
  sport,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="w-full shadow-none group">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="size-12 rounded bg-slate-50 flex items-center justify-center cursor-pointer group-hover:text-primary transition-all duration-500 overflow-hidden border border-slate-100 text-3xl">
          {sport.icon ? (
            <img
              src={sport.icon}
              alt={sport.name}
              className="w-full h-full object-cover"
            />
          ) : (
            "🏅"
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => onEdit(sport)}
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            onClick={() => onDelete(sport)}
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-1 text-2xl font-black">{sport.name}</CardTitle>
        <div className="text-xs text-slate-400 font-mono mb-4">
          {sport.slug}
        </div>
        <Badge variant="default">Active</Badge>
      </CardContent>
    </Card>
  );
};

export default SportCategoryCard;
