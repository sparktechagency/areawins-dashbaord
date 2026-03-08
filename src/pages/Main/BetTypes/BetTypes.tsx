import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { betTypeService, sportService } from "@/services/mockData";
import { BetType, Sport } from "@/types/schema";
import { BetTypeFormValues, betTypeSchema } from "@/validation/betType";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const BetTypes: React.FC = () => {
  const [betTypes, setBetTypes] = useState<BetType[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<BetTypeFormValues>({
    resolver: zodResolver(betTypeSchema) as any,
    defaultValues: {
      betTypeId: "",
      sport: "",
      name: "",
      slug: "",
      outcomes: [],
      isDefault: false,
      displayOrder: 0,
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "outcomes",
  });

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

  const onSubmit = (data: BetTypeFormValues) => {
    if (editingId) {
      const updated = betTypeService.update(editingId, data);
      if (updated) {
        toast.success("Bet Type updated successfully");
        loadData();
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update bet type");
      }
    } else {
      // Check uniqueness
      if (betTypes.some((b) => b.betTypeId === data.betTypeId)) {
        form.setError("betTypeId", { message: "ID must be unique" });
        return;
      }

      const newBetType = betTypeService.add(data);
      if (newBetType) {
        toast.success("Bet Type created successfully");
        loadData();
        setIsModalOpen(false);
      }
    }
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

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      betTypeId: `BET-TYPE-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      sport: "",
      name: "",
      slug: "",
      outcomes: [],
      displayOrder: 0,
      isActive: true,
      isDefault: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (betType: BetType) => {
    setEditingId(betType._id);
    form.reset({
      betTypeId: betType.betTypeId,
      sport: betType.sport,
      name: betType.name,
      slug: betType.slug,
      outcomes: betType.outcomes,
      isDefault: betType.isDefault,
      displayOrder: betType.displayOrder,
      isActive: betType.isActive,
    });
    setIsModalOpen(true);
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
          onClick={handleCreate}
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
                  onClick={() => handleEdit(bt)}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Bet Type" : "Create New Bet Type"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="betTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bet Type ID</FormLabel>
                      <FormControl>
                        <Input placeholder="BET-TYPE-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Sport" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sports.map((s) => (
                            <SelectItem key={s._id} value={s._id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Match Winner"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const slug = e.target.value
                              .toLowerCase()
                              .replace(/ /g, "_");
                            form.setValue("slug", slug);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="match_winner" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Outcomes Section */}
              <div className="space-y-4 border rounded p-4 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <FormLabel>Outcomes</FormLabel>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      append({
                        outcomeId: `outcome_${Date.now()}`,
                        label: "",
                        displayOrder: fields.length + 1,
                      })
                    }
                  >
                    + Add Outcome
                  </Button>
                </div>
                {form.formState.errors.outcomes && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.outcomes.message ||
                      form.formState.errors.outcomes.root?.message}
                  </p>
                )}

                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <FormField
                      control={form.control}
                      name={`outcomes.${index}.outcomeId`}
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-1">
                          <FormLabel className="text-xs text-slate-400">
                            ID
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-8 text-xs"
                              placeholder="home_win"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`outcomes.${index}.label`}
                      render={({ field }) => (
                        <FormItem className="flex-2 space-y-1">
                          <FormLabel className="text-xs text-slate-400">
                            Label
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-8 text-xs font-bold"
                              placeholder="Home Win"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`outcomes.${index}.displayOrder`}
                      render={({ field }) => (
                        <FormItem className="w-20 space-y-1">
                          <FormLabel className="text-xs text-slate-400">
                            Order
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="h-8 text-xs"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mt-6 text-destructive hover:bg-destructive/10"
                      onClick={() => remove(index)}
                    >
                      <span className="material-symbols-outlined text-sm">
                        close
                      </span>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Default Bet Type?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
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
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BetTypes;
