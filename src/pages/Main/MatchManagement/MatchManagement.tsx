import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteMatchMutation,
  useGetAllMatchesQuery,
} from "@/redux/features/match/matchApi";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { useGetAllTeamsQuery } from "@/redux/features/team/teamApi";
import { useGetAllTournamentsQuery } from "@/redux/features/tournament/tournamentApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MatchCard from "./MatchCard";

const MatchManagement: React.FC = () => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: matchesRes, isLoading } = useGetAllMatchesQuery({});
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const { data: tournamentsRes } = useGetAllTournamentsQuery({});
  const { data: teamsRes } = useGetAllTeamsQuery({});

  const [deleteMatch, { isLoading: isDeleting }] = useDeleteMatchMutation();

  const matches = matchesRes?.data?.results || [];
  const sports = sportsRes?.data?.results || [];
  const tournaments = tournamentsRes?.data?.results || [];
  const teams = teamsRes?.data?.results || [];

  const handleEdit = (m: any) => {
    navigate(`/match-management/edit/${m._id}`);
  };

  const handleCreate = () => {
    navigate("/match-management/add");
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMatch(deletingId).unwrap();
      toast.success("Match deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl  tracking-tighter mb-2">
            Match Management
          </h1>
          <p className="text-slate-500 font-medium">
            Schedule and manage match events and results.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          Schedule Match
        </Button>
      </div>

      {/* Matches Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 w-full rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {matches.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-12">
              No matches found. Schedule one to get started.
            </p>
          ) : (
            matches.map((m: any) => (
              <MatchCard
                key={m._id}
                match={m}
                sports={sports}
                tournaments={tournaments}
                teams={teams}
                onEdit={handleEdit}
                onDelete={(id) => setDeletingId(id)}
              />
            ))
          )}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deletingId}
        itemName="this match"
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};

export default MatchManagement;
