import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { betTypeService, sportService } from "@/services/mockData";
import { BetType, Sport } from "@/types/schema";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BetTypes: React.FC = () => {
  const navigate = useNavigate();
  const [betTypes, setBetTypes] = useState<BetType[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBetTypes(betTypeService.getAll());
    setSports(sportService.getAll());
  };

  const getSportName = (id: string) => {
    return sports.find((s) => s._id === id)?.name || "Unknown Sport";
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this bet type?")) {
      const success = betTypeService.delete(id);
      if (success) {
        toast.success("Bet Type deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete bet type");
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Bet Types Collection
          </h1>
          <p className="text-slate-500 font-medium">
            Define bet types and their potential outcomes for each sport.
          </p>
        </div>
        <Button
          onClick={() => navigate("/bet-types/add")}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Bet Type
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {betTypes.map((bt) => (
          <Card
            key={bt._id}
            className={`group transition-all duration-300 hover:scale-[1.02] hover:border-primary ${
              !bt.isActive ? "opacity-60 grayscale" : ""
            }`}
          >
            <CardHeader className="flex flex-row items-start justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-black">{bt.name}</CardTitle>
                <div className="text-sm text-slate-500 font-bold mt-1">
                  {getSportName(bt.sport)}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => navigate(`/bet-types/edit/${bt._id}`)}
                >
                  <span className="material-symbols-outlined text-lg">
                    edit
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(bt._id)}
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {bt.outcomes.map((o) => (
                    <Badge
                      key={o.outcomeId}
                      variant="secondary"
                      className="px-2 py-1"
                    >
                      {o.label}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-slate-100">
                  <span>{bt.betTypeId}</span>
                  <div className="flex gap-2">
                    {bt.isDefault && (
                      <Badge
                        variant="outline"
                        className="border-primary text-primary"
                      >
                        Default
                      </Badge>
                    )}
                    <Badge variant={bt.isActive ? "default" : "secondary"}>
                      {bt.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BetTypes;
