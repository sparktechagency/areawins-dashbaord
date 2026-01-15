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
import { betTypeService, sportService } from "../../services/mockData";
import { BetOutcome, BetType, Sport } from "../../types/schema";

const BetTypes: React.FC = () => {
  const [betTypes, setBetTypes] = useState<BetType[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBetType, setEditingBetType] = useState<Partial<BetType> | null>(
    null
  );

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBetType) return;

    if (
      !editingBetType.betTypeId ||
      !editingBetType.name ||
      !editingBetType.slug ||
      !editingBetType.sport
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!editingBetType.outcomes || editingBetType.outcomes.length === 0) {
      toast.error("Please add at least one outcome");
      return;
    }

    if (editingBetType._id) {
      const updated = betTypeService.update(editingBetType._id, editingBetType);
      if (updated) {
        toast.success("Bet Type updated successfully");
        loadData();
      } else {
        toast.error("Failed to update bet type");
      }
    } else {
      // Mock check for unique betTypeId
      const exists = betTypes.some(
        (b) => b.betTypeId === editingBetType.betTypeId
      );
      if (exists) {
        toast.error("Bet Type ID must be unique");
        return;
      }

      const newBetType = betTypeService.add({
        betTypeId: editingBetType.betTypeId!,
        sport: editingBetType.sport!,
        name: editingBetType.name!,
        slug: editingBetType.slug!,
        outcomes: editingBetType.outcomes!,
        isDefault: editingBetType.isDefault ?? false,
        displayOrder: editingBetType.displayOrder || 0,
        isActive: editingBetType.isActive ?? true,
      });

      if (newBetType) {
        toast.success("Bet Type created successfully");
        loadData();
      }
    }
    setIsModalOpen(false);
    setEditingBetType(null);
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

  const openNewModal = () => {
    setEditingBetType({
      betTypeId: `BET-TYPE-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      outcomes: [],
      displayOrder: 0,
      isActive: true,
      isDefault: false,
    });
    setIsModalOpen(true);
  };

  const addOutcome = () => {
    if (!editingBetType) return;
    const newOutcome: BetOutcome = {
      outcomeId: `outcome_${Date.now()}`,
      label: "",
      displayOrder: (editingBetType.outcomes?.length || 0) + 1,
    };
    setEditingBetType({
      ...editingBetType,
      outcomes: [...(editingBetType.outcomes || []), newOutcome],
    });
  };

  const updateOutcome = (
    index: number,
    field: keyof BetOutcome,
    value: any
  ) => {
    if (!editingBetType || !editingBetType.outcomes) return;
    const newOutcomes = [...editingBetType.outcomes];
    newOutcomes[index] = { ...newOutcomes[index], [field]: value };
    setEditingBetType({ ...editingBetType, outcomes: newOutcomes });
  };

  const removeOutcome = (index: number) => {
    if (!editingBetType || !editingBetType.outcomes) return;
    const newOutcomes = editingBetType.outcomes.filter((_, i) => i !== index);
    setEditingBetType({ ...editingBetType, outcomes: newOutcomes });
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
          onClick={openNewModal}
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
            className={!bt.isActive ? "opacity-60 grayscale" : ""}
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
                  onClick={() => {
                    setEditingBetType(bt);
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBetType?._id ? "Edit Bet Type" : "Create New Bet Type"}
      >
        <form
          onSubmit={handleSave}
          className="space-y-6 py-4 max-h-[80vh] overflow-y-auto px-1"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bet Type ID</Label>
              <Input
                required
                value={editingBetType?.betTypeId || ""}
                onChange={(e) =>
                  setEditingBetType({
                    ...editingBetType,
                    betTypeId: e.target.value,
                  })
                }
                placeholder="BET-TYPE-001"
              />
            </div>
            <div className="space-y-2">
              <Label>Sport</Label>
              <Select
                value={editingBetType?.sport || ""}
                onValueChange={(val) =>
                  setEditingBetType({ ...editingBetType, sport: val })
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
              value={editingBetType?.name || ""}
              onChange={(e) => {
                const name = e.target.value;
                setEditingBetType({
                  ...editingBetType,
                  name,
                  slug: name.toLowerCase().replace(/ /g, "_"),
                });
              }}
              placeholder="e.g. Match Winner"
            />
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              required
              value={editingBetType?.slug || ""}
              onChange={(e) =>
                setEditingBetType({ ...editingBetType, slug: e.target.value })
              }
              placeholder="e.g. match_winner"
            />
          </div>

          <div className="space-y-4 border rounded-xl p-4 bg-slate-50">
            <div className="flex justify-between items-center">
              <Label>Outcomes</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addOutcome}
              >
                + Add Outcome
              </Button>
            </div>
            {editingBetType?.outcomes?.map((outcome, idx) => (
              <div key={idx} className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-slate-400">ID</Label>
                  <Input
                    value={outcome.outcomeId}
                    onChange={(e) =>
                      updateOutcome(idx, "outcomeId", e.target.value)
                    }
                    className="h-8 text-xs"
                    placeholder="home_win"
                  />
                </div>
                <div className="flex-2 space-y-1">
                  <Label className="text-xs text-slate-400">Label</Label>
                  <Input
                    value={outcome.label}
                    onChange={(e) =>
                      updateOutcome(idx, "label", e.target.value)
                    }
                    className="h-8 text-xs font-bold"
                    placeholder="Home Win"
                  />
                </div>
                <div className="w-16 space-y-1">
                  <Label className="text-xs text-slate-400">Order</Label>
                  <Input
                    type="number"
                    value={outcome.displayOrder}
                    onChange={(e) =>
                      updateOutcome(
                        idx,
                        "displayOrder",
                        parseInt(e.target.value)
                      )
                    }
                    className="h-8 text-xs"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => removeOutcome(idx)}
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="isDefault"
                checked={editingBetType?.isDefault ?? false}
                onCheckedChange={(checked) =>
                  setEditingBetType({
                    ...editingBetType,
                    isDefault: checked === true,
                  })
                }
              />
              <Label htmlFor="isDefault">Default Bet Type?</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isActive"
                checked={editingBetType?.isActive ?? true}
                onCheckedChange={(checked) =>
                  setEditingBetType({
                    ...editingBetType,
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
              Save Bet Type
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BetTypes;
