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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { sportService } from "../../services/mockData";
import { Sport } from "../../types/schema";

const sportSchema = z.object({
  sportId: z.string().min(1, "Sport ID is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  icon: z.string().min(1, "Icon is required"),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

type SportFormValues = z.infer<typeof sportSchema>;

const Categories: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<SportFormValues>({
    resolver: zodResolver(sportSchema) as any,
    defaultValues: {
      sportId: "",
      name: "",
      slug: "",
      icon: "",
      displayOrder: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    loadSports();
  }, []);

  const loadSports = () => {
    setSports(sportService.getAll());
  };

  const onSubmit = (data: SportFormValues) => {
    if (editingId) {
      const updated = sportService.update(editingId, data);
      if (updated) {
        toast.success("Sport updated successfully");
        loadSports();
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update");
      }
    } else {
      // Check uniqueness
      if (sports.some((s) => s.sportId === data.sportId)) {
        form.setError("sportId", { message: "ID must be unique" });
        return;
      }

      const newSport = sportService.add(data);
      if (newSport) {
        toast.success("Sport created successfully");
        loadSports();
        setIsModalOpen(false);
      }
    }
  };

  const handleEdit = (sport: Sport) => {
    setEditingId(sport._id);
    form.reset({
      sportId: sport.sportId,
      name: sport.name,
      slug: sport.slug,
      icon: sport.icon,
      displayOrder: sport.displayOrder,
      isActive: sport.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      sportId: `SPORT-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: "",
      slug: "",
      icon: "⚽",
      displayOrder: 0,
      isActive: true,
    });
    setIsModalOpen(true);
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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        field.onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          onClick={handleCreate}
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
                  onClick={() => handleEdit(sport)}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Sport" : "Create New Sport"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sportId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport ID</FormLabel>
                      <FormControl>
                        <Input placeholder="SPORT-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>
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
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Football"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // Auto-generate slug
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
                      <Input placeholder="football" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Upload Sport Icon"
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active Status</FormLabel>
                      <FormDescription>Visible to users?</FormDescription>
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
                <Button type="submit" className="flex-1">
                  Save Sport
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
