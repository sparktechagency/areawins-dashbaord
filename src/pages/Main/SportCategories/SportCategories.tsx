import SportCategoriesSkeleton from "@/components/skeletons/SportCategoriesSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  useCreateSportCategoryMutation,
  useDeleteSportCategoryMutation,
  useGetAllSportCategoriesQuery,
  useUpdateSportCategoryMutation,
} from "@/redux/features/sportCategory/sportCategoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImageUpload } from "../../../components/common/ImageUpload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const sportSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.any().optional(),
});

type SportFormValues = z.infer<typeof sportSchema>;

const SportCategories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string>("");

  const { data: sportsRes, isLoading } = useGetAllSportCategoriesQuery({});
  const [createSportCategory, { isLoading: isCreating }] =
    useCreateSportCategoryMutation();
  const [updateSportCategory, { isLoading: isUpdating }] =
    useUpdateSportCategoryMutation();
  const [deleteSportCategory, { isLoading: isDeleting }] =
    useDeleteSportCategoryMutation();

  const sports = sportsRes?.data?.results || [];

  const form = useForm<SportFormValues>({
    resolver: zodResolver(sportSchema) as any,
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const onSubmit = async (data: SportFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.icon instanceof File) {
      formData.append("icon", data.icon);
    }

    try {
      if (editingId) {
        await updateSportCategory({ id: editingId, data: formData }).unwrap();
        toast.success("Sport updated successfully");
      } else {
        await createSportCategory(formData).unwrap();
        toast.success("Sport created successfully");
      }
      setIsModalOpen(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (sport: any) => {
    setEditingId(sport._id);
    form.reset({
      name: sport.name,
      icon: sport.icon,
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({ name: "", icon: "" });
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (sport: any) => {
    setDeletingId(sport._id);
    setDeletingName(sport.name);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteSportCategory(deletingId).unwrap();
      toast.success("Sport deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete sport");
    } finally {
      setDeletingId(null);
      setDeletingName("");
    }
  };

  if (isLoading) return <SportCategoriesSkeleton />;

  return (
    <div className="w-full p-4 md:p-8">
      {/* Header */}
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
          className="bg-primary text-secondary hover:bg-primary/90 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Sport
        </Button>
      </div>

      {/* Sports List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {sports?.length === 0 ? (
          <p className="col-span-full text-center text-slate-400 py-12">
            No sport categories found. Create one to get started.
          </p>
        ) : (
          sports?.map((sport: any) => (
            <Card key={sport._id} className="w-full shadow-none group ">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="size-12 rounded bg-slate-50 flex items-center justify-center cursor-pointer group-hover:text-primary transition-all duration-500 overflow-hidden border border-slate-100 text-3xl">
                  {sport.icon ? (
                    <img
                      src={sport.icon}
                      alt={sport.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "🏅"
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 cursor-pointer"
                    onClick={() => handleEdit(sport)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={() => openDeleteConfirm(sport)}
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
                  {sport.slug}
                </div>
                <Badge variant="default">Active</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Sport" : "Create New Sport"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Football" {...field} />
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
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 cursor-pointer rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 cursor-pointer rounded"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? "Saving..." : "Save Sport"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingId}
        onOpenChange={() => {
          setDeletingId(null);
          setDeletingName("");
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              Delete Sport
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-900">"{deletingName}"</span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={() => {
                  setDeletingId(null);
                  setDeletingName("");
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 cursor-pointer"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin material-symbols-outlined text-sm">
                      progress_activity
                    </span>
                    Deleting...
                  </span>
                ) : (
                  "Yes, Delete"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SportCategories;
