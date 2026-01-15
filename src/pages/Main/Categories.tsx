import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { sportService } from "../../services/mockData";
import { Sport } from "../../types/schema";

const Categories: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSport, setEditingSport] = useState<Partial<Sport> | null>(null);

  useEffect(() => {
    loadSports();
  }, []);

  const loadSports = () => {
    setSports(sportService.getAll());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSport) return;

    // Basic validation
    if (!editingSport.sportId || !editingSport.name || !editingSport.slug) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingSport._id) {
      // Update
      const updated = sportService.update(editingSport._id, editingSport);
      if (updated) {
        toast.success("Sport updated successfully");
        loadSports();
      } else {
        toast.error("Failed to update sport");
      }
    } else {
      // Create
      // Check for unique requirements (mock check)
      const exists = sports.some(
        (s) =>
          s.sportId === editingSport.sportId ||
          s.name === editingSport.name ||
          s.slug === editingSport.slug
      );
      if (exists) {
        toast.error("Sport ID, Name, or Slug must be unique");
        return;
      }

      const newSport = sportService.add({
        sportId: editingSport.sportId!,
        name: editingSport.name!,
        slug: editingSport.slug!,
        icon: editingSport.icon || "sports",
        displayOrder: editingSport.displayOrder || 0,
        isActive: editingSport.isActive ?? true,
      });

      if (newSport) {
        toast.success("Sport created successfully");
        loadSports();
      }
    }
    setIsModalOpen(false);
    setEditingSport(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sport?")) {
      const success = sportService.delete(id);
      if (success) {
        toast.success("Sport deleted successfully");
        loadSports();
      } else {
        toast.error("Failed to delete sport");
      }
    }
  };

  const openNewModal = () => {
    setEditingSport({
      sportId: `SPORT-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      displayOrder: 0,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Sports Collection
          </h1>
          <p className="text-slate-500 font-medium">
            Manage sports categories, icons, and visibility.
          </p>
        </div>
        <Button
          onClick={openNewModal}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Sport
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sports.map((sport) => (
          <Card
            key={sport._id}
            className={`group hover:border-accent transition-all duration-300 ${
              !sport.isActive
                ? "opacity-60 grayscale"
                : "hover:shadow-xl hover:shadow-accent/5"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-all duration-500 overflow-hidden border border-slate-100 text-3xl">
                {sport.icon.startsWith("http") ? (
                  <img
                    src={sport.icon}
                    alt={sport.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  sport.icon
                )}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => {
                    setEditingSport(sport);
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
                  className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(sport._id)}
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-1 text-2xl font-black">
                {sport.name}
              </CardTitle>
              <div className="text-xs text-slate-400 font-mono mb-4">
                {sport.sportId}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Order: {sport.displayOrder}
                </span>
                <Badge variant={sport.isActive ? "default" : "secondary"}>
                  {sport.isActive ? "Active" : "Disabled"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSport?._id ? "Edit Sport" : "Create New Sport"}
      >
        <form onSubmit={handleSave} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sportId">Sport ID</Label>
              <Input
                id="sportId"
                required
                value={editingSport?.sportId || ""}
                onChange={(e) =>
                  setEditingSport({ ...editingSport, sportId: e.target.value })
                }
                placeholder="SPORT-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={editingSport?.displayOrder || 0}
                onChange={(e) =>
                  setEditingSport({
                    ...editingSport,
                    displayOrder: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={editingSport?.name || ""}
              onChange={(e) => {
                const name = e.target.value;
                setEditingSport({
                  ...editingSport,
                  name,
                  slug: name.toLowerCase().replace(/ /g, "_"),
                });
              }}
              placeholder="e.g. Football"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              required
              value={editingSport?.slug || ""}
              onChange={(e) =>
                setEditingSport({ ...editingSport, slug: e.target.value })
              }
              placeholder="e.g. football"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (Emoji or URL)</Label>
            <Input
              id="icon"
              value={editingSport?.icon || ""}
              onChange={(e) =>
                setEditingSport({ ...editingSport, icon: e.target.value })
              }
              placeholder="⚽ or https://..."
            />
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Checkbox
              id="isActive"
              checked={editingSport?.isActive ?? true}
              onCheckedChange={(checked) =>
                setEditingSport({ ...editingSport, isActive: checked === true })
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
              Save Sport
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
