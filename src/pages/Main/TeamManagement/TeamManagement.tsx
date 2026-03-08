import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import {
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useGetAllTeamsQuery,
  useUpdateTeamMutation,
} from "@/redux/features/team/teamApi";
import { TeamFormValues, teamSchema } from "@/validation/team";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import TeamCard from "./TeamCard";
import TeamFormDialog from "./TeamFormDialog";

const TeamManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingTeam, setDeletingTeam] = useState<any | null>(null);

  const { data: teamsRes, isLoading } = useGetAllTeamsQuery({});
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});

  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();

  const teams = teamsRes?.data?.results || [];
  const sports = sportsRes?.data?.results || [];

  const getSportName = (id: string) =>
    sports.find((s: any) => s._id === id)?.name || "Unknown Sport";

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema) as any,
    defaultValues: {
      name: "",
      sport: "",
      tournament: "",
      shortName: "",
      country: "",
      foundedYear: "",
      logo: "",
    },
  });

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

  const handleEdit = (t: any) => {
    setEditingId(t._id);
    form.reset({
      name: t.name,
      sport: t.sport?._id || t.sport,
      tournament: t.tournament?._id || t.tournament,
      shortName: t.shortName,
      country: t.country,
      foundedYear: t.foundedYear,
      logo: t.logo,
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      name: "",
      sport: "",
      tournament: "",
      shortName: "",
      country: "",
      foundedYear: "",
      logo: "",
    });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTeam) return;
    try {
      await deleteTeam(deletingTeam._id).unwrap();
      toast.success("Team deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete");
    } finally {
      setDeletingTeam(null);
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
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

      {/* Teams Grid */}
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
              <TeamCard
                key={t._id}
                team={t}
                getSportName={getSportName}
                onEdit={handleEdit}
                onDelete={setDeletingTeam}
              />
            ))
          )}
        </div>
      )}

      <TeamFormDialog
        open={isModalOpen}
        editingId={editingId}
        form={form}
        sports={sports}
        isCreating={isCreating}
        isUpdating={isUpdating}
        onSubmit={onSubmit}
        onClose={() => setIsModalOpen(false)}
      />

      <DeleteConfirmDialog
        open={!!deletingTeam}
        itemName={deletingTeam?.name || "this team"}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTeam(null)}
      />
    </div>
  );
};

export default TeamManagement;
