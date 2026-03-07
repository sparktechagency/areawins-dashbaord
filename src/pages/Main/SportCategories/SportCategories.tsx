import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import SportCategoriesSkeleton from "@/components/skeletons/SportCategoriesSkeleton";
import { Button } from "@/components/ui/button";
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
import SportCategoryCard from "./SportCategoryCard";
import SportFormDialog from "./SportFormDialog";

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
    defaultValues: { name: "", icon: "" },
  });

  const onSubmit = async (data: SportFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.icon instanceof File) formData.append("icon", data.icon);

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
    form.reset({ name: sport.name, icon: sport.icon });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({ name: "", icon: "" });
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {sports?.length === 0 ? (
          <p className="col-span-full text-center text-slate-400 py-12">
            No sport categories found. Create one to get started.
          </p>
        ) : (
          sports?.map((sport: any) => (
            <SportCategoryCard
              key={sport._id}
              sport={sport}
              onEdit={handleEdit}
              onDelete={(s) => {
                setDeletingId(s._id);
                setDeletingName(s.name);
              }}
            />
          ))
        )}
      </div>

      {/* Create / Edit Dialog */}
      <SportFormDialog
        open={isModalOpen}
        editingId={editingId}
        form={form}
        isCreating={isCreating}
        isUpdating={isUpdating}
        onSubmit={onSubmit}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={!!deletingId}
        itemName={deletingName}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeletingId(null);
          setDeletingName("");
        }}
      />
    </div>
  );
};

export default SportCategories;
