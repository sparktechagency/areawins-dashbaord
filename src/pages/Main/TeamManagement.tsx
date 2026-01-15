import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { sportService, teamService } from "../../services/mockData";
import { Sport, Team } from "../../types/schema";

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Partial<Team> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setTeams(teamService.getAll());
    setSports(sportService.getAll());
  };

  const getSportName = (id: string) => {
    return sports.find((s) => s._id === id)?.name || "Unknown Sport";
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;

    if (
      !editingTeam.teamId ||
      !editingTeam.name ||
      !editingTeam.slug ||
      !editingTeam.sport ||
      !editingTeam.shortName ||
      !editingTeam.country
    ) {
      toast.error(
        "Please fill in all required fields (Team ID, Name, Slug, Sport, Short Name, Country)"
      );
      return;
    }

    if (editingTeam._id) {
      const updated = teamService.update(editingTeam._id, editingTeam);
      if (updated) {
        toast.success("Team updated successfully");
        loadData();
      } else {
        toast.error("Failed to update team");
      }
    } else {
      const exists = teams.some((t) => t.teamId === editingTeam.teamId);
      if (exists) {
        toast.error("Team ID must be unique");
        return;
      }

      const newTeam = teamService.add({
        teamId: editingTeam.teamId!,
        name: editingTeam.name!,
        shortName: editingTeam.shortName!,
        slug: editingTeam.slug!,
        sport: editingTeam.sport!,
        country: editingTeam.country!,
        logo: editingTeam.logo,
        isActive: editingTeam.isActive ?? true,
      });

      if (newTeam) {
        toast.success("Team created successfully");
        loadData();
      }
    }
    setIsModalOpen(false);
    setEditingTeam(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      const success = teamService.delete(id);
      if (success) {
        toast.success("Team deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete team");
      }
    }
  };

  const openNewModal = () => {
    setEditingTeam({
      teamId: `TEAM-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Team Management
          </h1>
          <p className="text-slate-500 font-medium">
            Manage teams, logos, and affiliations.
          </p>
        </div>
        <Button
          onClick={openNewModal}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Team
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teams.map((t) => (
          <Card
            key={t._id}
            className={!t.isActive ? "opacity-60 grayscale" : ""}
          >
            <CardHeader className="flex flex-col items-center pb-2">
              <div className="size-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 overflow-hidden shadow-sm">
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
                {getSportName(t.sport)}
              </Badge>
              <CardTitle className="text-xl font-black text-center">
                {t.name}
              </CardTitle>
              <span className="text-sm font-bold text-slate-400">
                {t.shortName}
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-50">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingTeam(t);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={() => handleDelete(t._id)}
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
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTeam?._id ? "Edit Team" : "New Team"}
      >
        <form
          onSubmit={handleSave}
          className="space-y-6 py-4 px-1 max-h-[80vh] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Team ID</Label>
              <Input
                required
                value={editingTeam?.teamId || ""}
                onChange={(e) =>
                  setEditingTeam({ ...editingTeam, teamId: e.target.value })
                }
                placeholder="TEAM-001"
              />
            </div>
            <div className="space-y-2">
              <Label>Sport</Label>
              <Select
                value={editingTeam?.sport || ""}
                onValueChange={(val) =>
                  setEditingTeam({ ...editingTeam, sport: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              required
              value={editingTeam?.name || ""}
              onChange={(e) => {
                const name = e.target.value;
                setEditingTeam({
                  ...editingTeam,
                  name,
                  slug: name
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, ""),
                  shortName: name.substring(0, 3).toUpperCase(),
                });
              }}
              placeholder="e.g. Manchester United"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Short Name</Label>
              <Input
                required
                value={editingTeam?.shortName || ""}
                onChange={(e) =>
                  setEditingTeam({ ...editingTeam, shortName: e.target.value })
                }
                placeholder="e.g. MUN"
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                required
                value={editingTeam?.slug || ""}
                onChange={(e) =>
                  setEditingTeam({ ...editingTeam, slug: e.target.value })
                }
                placeholder="e.g. man-utd"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country (ISO)</Label>
              <Input
                required
                value={editingTeam?.country || ""}
                onChange={(e) =>
                  setEditingTeam({ ...editingTeam, country: e.target.value })
                }
                placeholder="e.g. GB"
              />
            </div>
            <div className="space-y-2">
              <Label>Logo (URL)</Label>
              <Input
                value={editingTeam?.logo || ""}
                onChange={(e) =>
                  setEditingTeam({ ...editingTeam, logo: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Checkbox
              id="isActive"
              checked={editingTeam?.isActive ?? true}
              onCheckedChange={(checked) =>
                setEditingTeam({ ...editingTeam, isActive: checked === true })
              }
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Is Active?
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Team
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeamManagement;
