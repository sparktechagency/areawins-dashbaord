import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import SportCategoriesSkeleton from "@/components/skeletons/SportCategoriesSkeleton";
import { Button } from "@/components/ui/button";
import {
  useDeleteSportCategoryMutation,
  useGetAllSportCategoriesQuery,
} from "@/redux/features/sportCategory/sportCategoryApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SportCategoryCard from "./SportCategoryCard";

const SportCategories: React.FC = () => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string>("");

  const { data: sportsRes, isLoading } = useGetAllSportCategoriesQuery({});
  const [deleteSportCategory, { isLoading: isDeleting }] =
    useDeleteSportCategoryMutation();

  const sports = sportsRes?.data?.results || [];

  const handleEdit = (sport: any) => {
    navigate(`/categories/edit/${sport._id}`);
  };

  const handleCreate = () => {
    navigate("/categories/add");
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
          className="bg-primary text-white hover:bg-primary/90 cursor-pointer"
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
