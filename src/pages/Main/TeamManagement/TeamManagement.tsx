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
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import TeamCard from "./TeamCard";

const TeamManagement: React.FC = () => {
  const navigate = useNavigate();
  const { sportId, tournamentId } = useParams<{
    sportId: string;
    tournamentId: string;
  }>();

  const [deletingTeam, setDeletingTeam] = useState<any | null>(null);

  const { data: teamsRes, isLoading } = useGetAllTeamsQuery({
    sport: sportId,
    tournament: tournamentId,
  });
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});

  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();

  const teams = teamsRes?.data?.results || [];
  const sports = sportsRes?.data?.results || [];

  const getSportName = (id: string) =>
    sports.find((s: any) => s._id === id)?.name || "Unknown Sport";

  const handleEdit = (t: any) => {
    navigate(
      `/categories/${sportId}/tournaments/${tournamentId}/teams/edit/${t._id}`,
    );
  };

  const handleCreate = () => {
    navigate(`/categories/${sportId}/tournaments/${tournamentId}/teams/add`);
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/categories/${sportId}/tournaments`)}
            className="rounded-full hover:bg-slate-100"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
          <div>
            <h1 className="text-3xl md:text-5xl  tracking-tighter mb-2">
              Team Management
            </h1>
            <p className="text-slate-500 font-medium">
              Manage teams, logos, and affiliations.
            </p>
          </div>
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
