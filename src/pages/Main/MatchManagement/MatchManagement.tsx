import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateMatchMutation,
  useDeleteMatchMutation,
  useGetAllMatchesQuery,
  useUpdateMatchMutation,
} from "@/redux/features/match/matchApi";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { useGetAllTeamsQuery } from "@/redux/features/team/teamApi";
import { useGetAllTournamentsQuery } from "@/redux/features/tournament/tournamentApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import MatchCard from "./MatchCard";
import MatchFormDialog from "./MatchFormDialog";

const matchSchema = z
  .object({
    sport: z.string().min(1, "Sport is required"),
    tournament: z.string().optional(),
    homeTeam: z.string().min(1, "Home Team is required"),
    awayTeam: z.string().min(1, "Away Team is required"),
    scheduledStartTime: z.string().min(1, "Start Time is required"),
    status: z.enum(["scheduled", "live", "finished", "cancelled", "postponed"]),
    isFeatured: z.boolean(),
    homeScore: z.coerce.number(),
    awayScore: z.coerce.number(),
  })
  .refine((data) => data.homeTeam !== data.awayTeam, {
    message: "Home and Away teams cannot be the same",
    path: ["awayTeam"],
  });

type MatchFormValues = z.infer<typeof matchSchema>;

const MatchManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: matchesRes, isLoading } = useGetAllMatchesQuery({});
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const { data: tournamentsRes } = useGetAllTournamentsQuery({});
  const { data: teamsRes } = useGetAllTeamsQuery({});
  const [createMatch, { isLoading: isCreating }] = useCreateMatchMutation();
  const [updateMatch, { isLoading: isUpdating }] = useUpdateMatchMutation();
  const [deleteMatch, { isLoading: isDeleting }] = useDeleteMatchMutation();

  const matches = matchesRes?.data?.results || [];
  const sports = sportsRes?.data?.results || [];
  const tournaments = tournamentsRes?.data?.results || [];
  const teams = teamsRes?.data?.results || [];

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema) as any,
    defaultValues: {
      sport: "",
      tournament: "",
      homeTeam: "",
      awayTeam: "",
      scheduledStartTime: "",
      status: "scheduled",
      isFeatured: false,
      homeScore: 0,
      awayScore: 0,
    },
  });

  const onSubmit = async (data: MatchFormValues) => {
    const payload: any = {
      sport: data.sport,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      scheduledStartTime: new Date(data.scheduledStartTime),
      status: data.status,
      isFeatured: data.isFeatured,
    };
    if (data.tournament && data.tournament !== "none")
      payload.tournament = data.tournament;
    if (data.status === "live" || data.status === "finished") {
      payload.liveStatus = {
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        lastUpdated: new Date(),
      };
    }
    try {
      if (editingId) {
        await updateMatch({ id: editingId, data: payload }).unwrap();
        toast.success("Match updated successfully");
      } else {
        await createMatch(payload).unwrap();
        toast.success("Match created successfully");
      }
      setIsModalOpen(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (m: any) => {
    setEditingId(m._id);
    form.reset({
      sport: m.sport?._id || m.sport,
      tournament: m.tournament?._id || m.tournament || "none",
      homeTeam: m.homeTeam?._id || m.homeTeam,
      awayTeam: m.awayTeam?._id || m.awayTeam,
      scheduledStartTime: m.scheduledStartTime
        ? new Date(m.scheduledStartTime).toISOString().slice(0, 16)
        : "",
      status: m.status,
      isFeatured: m.isFeatured,
      homeScore: m.liveStatus?.homeScore || 0,
      awayScore: m.liveStatus?.awayScore || 0,
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      sport: "",
      tournament: "",
      homeTeam: "",
      awayTeam: "",
      scheduledStartTime: "",
      status: "scheduled",
      isFeatured: false,
      homeScore: 0,
      awayScore: 0,
    });
    setIsModalOpen(true);
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
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
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

      <MatchFormDialog
        open={isModalOpen}
        editingId={editingId}
        form={form}
        sports={sports}
        tournaments={tournaments}
        teams={teams}
        isCreating={isCreating}
        isUpdating={isUpdating}
        onSubmit={onSubmit}
        onClose={() => setIsModalOpen(false)}
      />

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
