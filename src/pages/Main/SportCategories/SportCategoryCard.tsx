import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <Card
      className="w-full shadow-none group cursor-pointer hover:border-primary transition-all duration-300 hover:scale-[1.02]"
      onClick={() => navigate(`/categories/${sport._id}/tournaments`)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="size-12 rounded flex items-center justify-center">
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
            onClick={(e) => {
              e.stopPropagation();
              onEdit(sport);
            }}
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(sport);
            }}
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative overflow-hidden">
        <CardTitle className="mb-1 text-2xl font-black">{sport.name}</CardTitle>
        <div className="text-xs text-slate-400 font-mono mb-4">
          {sport.slug}
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="default">Active</Badge>
          <div className="flex items-center gap-1 text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            <span>View Tournaments</span>
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SportCategoryCard;
