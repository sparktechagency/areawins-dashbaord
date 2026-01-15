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
import { sportService, tournamentService } from "../../services/mockData";
import { Sport, Tournament, TournamentType } from "../../types/schema";

const TournamentManagement: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTournament, setEditingTournament] =
    useState<Partial<Tournament> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setTournaments(tournamentService.getAll());
    setSports(sportService.getAll());
  };

  const getSportName = (id: string) => {
    return sports.find((s) => s._id === id)?.name || "Unknown Sport";
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTournament) return;

    if (
      !editingTournament.tournamentId ||
      !editingTournament.name ||
      !editingTournament.slug ||
      !editingTournament.sport
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingTournament._id) {
      const updated = tournamentService.update(
        editingTournament._id,
        editingTournament
      );
      if (updated) {
        toast.success("Tournament updated successfully");
        loadData();
      } else {
        toast.error("Failed to update tournament");
      }
    } else {
      const exists = tournaments.some(
        (t) => t.tournamentId === editingTournament.tournamentId
      );
      if (exists) {
        toast.error("Tournament ID must be unique");
        return;
      }

      const newTournament = tournamentService.add({
        tournamentId: editingTournament.tournamentId!,
        name: editingTournament.name!,
        slug: editingTournament.slug!,
        sport: editingTournament.sport!,
        type: editingTournament.type || "league",
        year: editingTournament.year,
        country: editingTournament.country,
        logo: editingTournament.logo,
        isFeatured: editingTournament.isFeatured ?? false,
        displayOrder: editingTournament.displayOrder || 0,
        isActive: editingTournament.isActive ?? true,
      });

      if (newTournament) {
        toast.success("Tournament created successfully");
        loadData();
      }
    }
    setIsModalOpen(false);
    setEditingTournament(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this tournament?")) {
      const success = tournamentService.delete(id);
      if (success) {
        toast.success("Tournament deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete tournament");
      }
    }
  };

  const openNewModal = () => {
    setEditingTournament({
      tournamentId: `TOUR-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      type: "league",
      displayOrder: 0,
      isActive: true,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Tournament Manager
          </h1>
          <p className="text-slate-500 font-medium">
            Manage leagues, cups, and tournaments.
          </p>
        </div>
        <Button
          onClick={openNewModal}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Tournament
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {tournaments.map((t) => (
          <Card
            key={t._id}
            className={!t.isActive ? "opacity-60 grayscale" : ""}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-2xl">
                {t.logo && t.logo.startsWith("http") ? (
                  <img
                    src={t.logo}
                    alt={t.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  t.logo || "🏆"
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => {
                    setEditingTournament(t);
                    setIsModalOpen(true);
                  }}
                >
                  <span className="material-symbols-outlined text-lg">
                    edit
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(t._id)}
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle
                className="text-lg font-black mb-1 truncate"
                title={t.name}
              >
                {t.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {getSportName(t.sport)}
                </Badge>
                <Badge variant="secondary" className="text-xs uppercase">
                  {t.type}
                </Badge>
                {t.year && (
                  <Badge variant="secondary" className="text-xs">
                    {t.year}
                  </Badge>
                )}
                {t.country && (
                  <Badge variant="secondary" className="text-xs">
                    {t.country}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 text-xs font-mono text-slate-400 pt-3 border-t border-slate-100">
                <span>{t.tournamentId}</span>
                <div className="flex gap-2">
                  {t.isFeatured && (
                    <Badge
                      variant="outline"
                      className="border-accent text-accent"
                    >
                      Featured
                    </Badge>
                  )}
                  <Badge variant={t.isActive ? "default" : "secondary"}>
                    {t.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTournament?._id ? "Edit Tournament" : "New Tournament"}
      >
        <form
          onSubmit={handleSave}
          className="space-y-6 py-4 px-1 max-h-[80vh] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tournament ID</Label>
              <Input
                required
                value={editingTournament?.tournamentId || ""}
                onChange={(e) =>
                  setEditingTournament({
                    ...editingTournament,
                    tournamentId: e.target.value,
                  })
                }
                placeholder="TOUR-001"
              />
            </div>
            <div className="space-y-2">
              <Label>Sport</Label>
              <Select
                value={editingTournament?.sport || ""}
                onValueChange={(val) =>
                  setEditingTournament({ ...editingTournament, sport: val })
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
              value={editingTournament?.name || ""}
              onChange={(e) => {
                const name = e.target.value;
                setEditingTournament({
                  ...editingTournament,
                  name,
                  slug: name
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, ""),
                });
              }}
              placeholder="e.g. Premier League 2024"
            />
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              required
              value={editingTournament?.slug || ""}
              onChange={(e) =>
                setEditingTournament({
                  ...editingTournament,
                  slug: e.target.value,
                })
              }
              placeholder="e.g. premier-league-2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={editingTournament?.type || "league"}
                onValueChange={(val) =>
                  setEditingTournament({
                    ...editingTournament,
                    type: val as TournamentType,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "league",
                    "tournament",
                    "cup",
                    "international",
                    "grand_slam",
                  ].map((t) => (
                    <SelectItem key={t} value={t} className="capitalize">
                      {t.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={editingTournament?.year || ""}
                onChange={(e) =>
                  setEditingTournament({
                    ...editingTournament,
                    year: e.target.value,
                  })
                }
                placeholder="e.g. 2026"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country (ISO)</Label>
              <Input
                value={editingTournament?.country || ""}
                onChange={(e) =>
                  setEditingTournament({
                    ...editingTournament,
                    country: e.target.value,
                  })
                }
                placeholder="e.g. GB"
              />
            </div>
            <div className="space-y-2">
              <Label>Logo (URL/Emoji)</Label>
              <Input
                value={editingTournament?.logo || ""}
                onChange={(e) =>
                  setEditingTournament({
                    ...editingTournament,
                    logo: e.target.value,
                  })
                }
                placeholder="🏆 or https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Display Order</Label>
            <Input
              type="number"
              value={editingTournament?.displayOrder || 0}
              onChange={(e) =>
                setEditingTournament({
                  ...editingTournament,
                  displayOrder: parseInt(e.target.value),
                })
              }
            />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="isFeatured"
                checked={editingTournament?.isFeatured ?? false}
                onCheckedChange={(checked) =>
                  setEditingTournament({
                    ...editingTournament,
                    isFeatured: checked === true,
                  })
                }
              />
              <Label htmlFor="isFeatured">Featured?</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isActive"
                checked={editingTournament?.isActive ?? true}
                onCheckedChange={(checked) =>
                  setEditingTournament({
                    ...editingTournament,
                    isActive: checked === true,
                  })
                }
              />
              <Label htmlFor="isActive">Active?</Label>
            </div>
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
              Save Tournament
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TournamentManagement;
