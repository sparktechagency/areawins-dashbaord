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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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
import { sportService, tournamentService } from "../../services/mockData";
import { Sport, Tournament } from "../../types/schema";

const tournamentSchema = z.object({
  tournamentId: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  sport: z.string().min(1, "Sport is required"),
  type: z.enum(["league", "tournament", "cup", "international", "grand_slam"]),
  year: z.string().optional(),
  country: z.string().optional(),
  logo: z.string().optional(),
  isFeatured: z.boolean(),
  displayOrder: z.coerce.number().int().min(0),
  isActive: z.boolean(),
});

type TournamentFormValues = z.infer<typeof tournamentSchema>;

const TournamentManagement: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      tournamentId: "",
      name: "",
      slug: "",
      sport: "",
      type: "league",
      year: "",
      country: "",
      logo: "",
      isFeatured: false,
      displayOrder: 0,
      isActive: true,
    },
  });

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

  const onSubmit = (data: TournamentFormValues) => {
    if (editingId) {
      const updated = tournamentService.update(editingId, data);
      if (updated) {
        toast.success("Tournament updated successfully");
        loadData();
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update tournament");
      }
    } else {
      if (tournaments.some((t) => t.tournamentId === data.tournamentId)) {
        form.setError("tournamentId", { message: "ID must be unique" });
        return;
      }
      const newTournament = tournamentService.add(data);
      if (newTournament) {
        toast.success("Tournament created successfully");
        loadData();
        setIsModalOpen(false);
      }
    }
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

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      tournamentId: `TOUR-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: "",
      slug: "",
      sport: "",
      type: "league",
      year: "",
      country: "",
      logo: "",
      isFeatured: false,
      displayOrder: 0,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (t: Tournament) => {
    setEditingId(t._id);
    form.reset({
      tournamentId: t.tournamentId,
      name: t.name,
      slug: t.slug,
      sport: t.sport,
      type: t.type,
      year: t.year,
      country: t.country,
      logo: t.logo,
      isFeatured: t.isFeatured,
      displayOrder: t.displayOrder,
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Tournament" : "New Tournament"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tournamentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tournament ID</FormLabel>
                      <FormControl>
                        <Input placeholder="TOUR-001" {...field} />
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
                          const slug = e.target.value
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "");
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
                        defaultValue={field.value}
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
                        defaultValue={field.value}
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
              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                <Button type="submit" className="flex-1">
                  Save Tournament
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
