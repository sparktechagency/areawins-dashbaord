import { ImageUpload } from "@/components/common/ImageUpload";
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
import { Skeleton } from "@/components/ui/skeleton";
import { countries } from "@/constants/countries";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import {
  useCreateTournamentMutation,
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
  useUpdateTournamentMutation,
} from "@/redux/features/tournament/tournamentApi";
import {
  TournamentFormValues,
  tournamentSchema,
} from "@/validation/tournament";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TournamentManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);

  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const sports = sportsRes?.data?.results || [];

  // Auto-select first sport category if none selected
  React.useEffect(() => {
    if (sports.length > 0 && !selectedSportId) {
      setSelectedSportId(sports[0]._id);
    }
  }, [sports, selectedSportId]);

  const { data: tournamentsRes, isLoading } = useGetAllTournamentsQuery(
    selectedSportId ? { sport: selectedSportId } : {},
    { skip: !selectedSportId },
  );

  const [createTournament, { isLoading: isCreating }] =
    useCreateTournamentMutation();
  const [updateTournament, { isLoading: isUpdating }] =
    useUpdateTournamentMutation();
  const [deleteTournament] = useDeleteTournamentMutation();

  const tournaments = tournamentsRes?.data?.results || [];

  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema) as any,
    defaultValues: {
      name: "",
      sport: selectedSportId || "",
      type: "league",
      description: "",
      startDate: "",
      endDate: "",
      year: "",
      country: "",
      isFeatured: false,
      logo: "",
    },
  });

  // Update sport in form when selectedSportId changes
  React.useEffect(() => {
    if (selectedSportId && !editingId) {
      form.setValue("sport", selectedSportId);
    }
  }, [selectedSportId, form, editingId]);

  const getSportName = (id: string) => {
    return sports.find((s: any) => s._id === id)?.name || "Unknown Sport";
  };

  const onSubmit = async (data: TournamentFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        if (val instanceof File) {
          formData.append(key, val);
        } else {
          formData.append(key, String(val));
        }
      }
    });

    try {
      if (editingId) {
        await updateTournament({ id: editingId, data: formData }).unwrap();
        toast.success("Tournament updated successfully");
      } else {
        await createTournament(formData).unwrap();
        toast.success("Tournament created successfully");
      }
      setIsModalOpen(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tournament?")) {
      try {
        await deleteTournament(id).unwrap();
        toast.success("Tournament deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete");
      }
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      name: "",
      sport: selectedSportId || "",
      type: "league",
      description: "",
      startDate: "",
      endDate: "",
      year: "",
      country: "",
      isFeatured: false,
      logo: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (t: any) => {
    setEditingId(t._id);
    form.reset({
      name: t.name,
      sport: t.sport?._id || t.sport,
      type: t.type,
      description: t.description || "",
      startDate: t.startDate || "",
      endDate: t.endDate || "",
      year: t.year || "",
      country: t.country,
      isFeatured: t.isFeatured,
      logo: t.logo,
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
            Manage leagues, cups, and tournaments by sport category.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Tournament
        </Button>
      </div>

      {/* Sport Category Bar */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-4 no-scrollbar">
        {sports.map((sport: any) => (
          <button
            key={sport._id}
            onClick={() => setSelectedSportId(sport._id)}
            className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
              selectedSportId === sport._id
                ? "bg-primary/5 border-primary shadow-sm"
                : "bg-white border-transparent hover:border-slate-200"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                selectedSportId === sport._id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              {sport.icon ? (
                <img
                  src={sport.icon}
                  alt={sport.name}
                  className={`w-10 h-10 object-contain ${
                    selectedSportId === sport._id ? "brightness-0 invert" : ""
                  }`}
                />
              ) : (
                <span className="material-symbols-outlined text-3xl">
                  sports_soccer
                </span>
              )}
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                selectedSportId === sport._id
                  ? "text-primary"
                  : "text-slate-500"
              }`}
            >
              {sport.name}
            </span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {tournaments.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-12">
              No tournaments found for this category. Create one to get started.
            </p>
          ) : (
            tournaments.map((t: any) => (
              <Card key={t._id}>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div className="size-12 rounded bg-slate-50 flex items-center justify-center border border-slate-100 text-2xl">
                    {t.logo && t.logo.startsWith("http") ? (
                      <img
                        src={t.logo}
                        alt={t.name}
                        className="w-full h-full object-cover rounded"
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
                      onClick={() => handleEdit(t)}
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
                      {getSportName(t.sport?._id || t.sport)}
                    </Badge>
                    <Badge variant="secondary" className="text-xs ">
                      {t.type}
                    </Badge>
                    {t.year && (
                      <Badge variant="secondary" className="text-xs">
                        {t.year}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 min-h-8">
                    {t.description || "No description available."}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-xs font-mono text-slate-400 pt-3 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span>{t.startDate || "N/A"}</span>
                      <span>{t.endDate || "N/A"}</span>
                    </div>
                    <div className="flex gap-2">
                      {t.isFeatured && (
                        <Badge
                          variant="outline"
                          className="border-accent text-accent"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Tournament" : "New Tournament"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Sport" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sports.map((s: any) => (
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

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tournament Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "league",
                            "tournament",
                            "cup",
                            "international",
                            "grand_slam",
                            "other",
                          ].map((t) => (
                            <SelectItem
                              key={t}
                              value={t}
                              className="capitalize"
                            >
                              {t.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tournament Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Premier League 2024"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="2026" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              {c.name} ({c.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-3 h-12 border rounded">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Tournament?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of the tournament..."
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tournament Logo</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Upload Tournament Logo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? "Saving..." : "Save Tournament"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TournamentManagement;
