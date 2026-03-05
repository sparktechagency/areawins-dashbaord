import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import {
  useCreateTournamentMutation,
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
  useUpdateTournamentMutation,
} from "@/redux/features/tournament/tournamentApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImageUpload } from "../../components/common/ImageUpload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { countries } from "../../constants/countries";

const tournamentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  sport: z.string().min(1, "Sport is required"),
  type: z.enum(["league", "tournament", "cup", "international", "grand_slam"]),
  year: z.string().optional(),
  country: z.string().optional(),
  logo: z.any().optional(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

type TournamentFormValues = z.infer<typeof tournamentSchema>;

const TournamentManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: tournamentsRes, isLoading } = useGetAllTournamentsQuery({});
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const [createTournament, { isLoading: isCreating }] =
    useCreateTournamentMutation();
  const [updateTournament, { isLoading: isUpdating }] =
    useUpdateTournamentMutation();
  const [deleteTournament] = useDeleteTournamentMutation();

  const tournaments = tournamentsRes?.data?.results || [];
  const sports = sportsRes?.data?.results || [];

  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema) as any,
    defaultValues: {
      name: "",
      slug: "",
      sport: "",
      type: "league",
      year: "",
      country: "",
      logo: "",
      isFeatured: false,
      isActive: true,
    },
  });

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
      slug: "",
      sport: "",
      type: "league",
      year: "",
      country: "",
      logo: "",
      isFeatured: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (t: any) => {
    setEditingId(t._id);
    form.reset({
      name: t.name,
      slug: t.slug,
      sport: t.sport?._id || t.sport,
      type: t.type,
      year: t.year,
      country: t.country,
      logo: t.logo,
      isFeatured: t.isFeatured,
      isActive: t.isActive,
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
          onClick={handleCreate}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Tournament
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {tournaments.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-12">
              No tournaments found. Create one to get started.
            </p>
          ) : (
            tournaments.map((t: any) => (
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
                    <Badge variant="secondary" className="text-xs uppercase">
                      {t.type}
                    </Badge>
                    {t.year && (
                      <Badge variant="secondary" className="text-xs">
                        {t.year}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-xs font-mono text-slate-400 pt-3 border-t border-slate-100">
                    <span>{t.slug}</span>
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
            ))
          )}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Tournament" : "New Tournament"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sport</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Premier League 2024"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.setValue(
                            "slug",
                            e.target.value
                              .toLowerCase()
                              .replace(/ /g, "-")
                              .replace(/[^\w-]+/g, ""),
                          );
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
                      <Input placeholder="premier-league-2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="2026" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                          <SelectTrigger>
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
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
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
              </div>

              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured?</FormLabel>
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
                <Button
                  type="submit"
                  className="flex-1"
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
