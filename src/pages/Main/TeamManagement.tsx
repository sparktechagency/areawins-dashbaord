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
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useGetAllTeamsQuery,
  useUpdateTeamMutation,
} from "@/redux/features/team/teamApi";
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

const teamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  sport: z.string().min(1, "Sport is required"),
  shortName: z.string().min(1, "Short Name is required"),
  country: z.string().min(1, "Country is required"),
  logo: z.any().optional(),
  isActive: z.boolean(),
});

type TeamFormValues = z.infer<typeof teamSchema>;

const TeamManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: teamsRes, isLoading } = useGetAllTeamsQuery({});
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const teams = teamsRes?.data?.results || [];
  const sports = sportsRes?.data?.results || [];

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema) as any,
    defaultValues: {
      name: "",
      slug: "",
      sport: "",
      shortName: "",
      country: "",
      logo: "",
      isActive: true,
    },
  });

  const getSportName = (id: string) =>
    sports.find((s: any) => s._id === id)?.name || "Unknown Sport";

  const onSubmit = async (data: TeamFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        if (val instanceof File) formData.append(key, val);
        else formData.append(key, String(val));
      }
    });

    try {
      if (editingId) {
        await updateTeam({ id: editingId, data: formData }).unwrap();
        toast.success("Team updated successfully");
      } else {
        await createTeam(formData).unwrap();
        toast.success("Team created successfully");
      }
      setIsModalOpen(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(id).unwrap();
        toast.success("Team deleted successfully");
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
      shortName: "",
      country: "",
      logo: "",
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
      shortName: t.shortName,
      country: t.country,
      logo: t.logo,
      isActive: t.isActive,
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
          onClick={handleCreate}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Team
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-52 w-full rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-12">
              No teams found. Create one to get started.
            </p>
          ) : (
            teams.map((t: any) => (
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
                    {getSportName(t.sport?._id || t.sport)}
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
                        onClick={() => handleEdit(t)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
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
            ))
          )}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Team" : "New Team"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                  name="shortName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Name</FormLabel>
                      <FormControl>
                        <Input placeholder="MUN" {...field} />
                      </FormControl>
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
                        placeholder="Manchester United"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          const val = e.target.value;
                          form.setValue(
                            "slug",
                            val
                              .toLowerCase()
                              .replace(/ /g, "-")
                              .replace(/[^\w-]+/g, ""),
                          );
                          if (!form.getValues("shortName"))
                            form.setValue(
                              "shortName",
                              val.substring(0, 3).to(),
                            );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="man-utd" {...field} />
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
              </div>

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
                        placeholder="Upload Team Logo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded">
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
                  {isCreating || isUpdating ? "Saving..." : "Save Team"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagement;
