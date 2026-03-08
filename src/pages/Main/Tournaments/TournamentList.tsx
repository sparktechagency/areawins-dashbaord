import { Button } from "@/components/ui/button";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import {
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
} from "@/redux/features/tournament/tournamentApi";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import SportCategoryBar from "./SportCategoryBar";
import TournamentGrid from "./TournamentGrid";

const TournamentList: React.FC = () => {
  const { sportId } = useParams<{ sportId: string }>();
  const navigate = useNavigate();
  const [categoryPage, setCategoryPage] = useState(1);
  const [tournamentPage, setTournamentPage] = useState(1);
  const CATEGORY_LIMIT = 50;
  const TOURNAMENT_LIMIT = 12;

  const { data: sportsRes, isLoading: isSportsLoading } =
    useGetAllSportCategoriesQuery({
      page: categoryPage,
      limit: CATEGORY_LIMIT,
    });
  const sports = sportsRes?.data?.results || [];

  const currentSport = sports.find((s: any) => s._id === sportId);

  const getPages = (res: any, limit: number) => {
    const pagination =
      res?.data?.pagination || res?.data?.meta || res?.data || {};
    const totalPages = pagination.totalPages;
    if (totalPages !== undefined) return totalPages;

    const total =
      pagination.totalResult ||
      pagination.total ||
      pagination.totalCount ||
      pagination.count ||
      0;
    return Math.ceil(total / limit) || 1;
  };

  const categoryTotalPages = getPages(sportsRes, CATEGORY_LIMIT);

  const tournamentParams: any = {
    page: tournamentPage,
    limit: TOURNAMENT_LIMIT,
  };

  if (sportId && sportId !== "all") {
    tournamentParams.sport = sportId;
  }

  const { data: tournamentsRes, isLoading } =
    useGetAllTournamentsQuery(tournamentParams);

  const tournamentTotalPages = getPages(tournamentsRes, TOURNAMENT_LIMIT);

  const [deleteTournament] = useDeleteTournamentMutation();

  const tournaments = tournamentsRes?.data?.results || [];

  const getSportName = (id: string) => {
    return sports.find((s: any) => s._id === id)?.name || "Unknown Sport";
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tournament?")) {
      try {
        await deleteTournament(id).unwrap();
        toast.success("Tournament deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete");
      }
    }
  };

  const handleCreate = () => {
    navigate("/tournaments/add");
  };

  const handleEdit = (t: any) => {
    navigate(`/tournaments/edit/${t._id}`);
  };

  const handleSelectSport = (id: string) => {
    if (id === "all") {
      navigate("/tournaments");
    } else {
      navigate(`/tournaments/${id}`);
    }
    setTournamentPage(1);
  };
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            {sportId && sportId !== "all"
              ? `${currentSport?.name || "Sport"} Tournaments`
              : "All Tournaments"}
          </h1>
          <p className="text-slate-500 font-medium">
            Manage tournaments and leagues{" "}
            {sportId && sportId !== "all"
              ? `for ${currentSport?.name || "this category"}`
              : "across all categories"}
            .
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-white hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Tournament
        </Button>
      </div>

      {/* Sport Category Bar */}
      <SportCategoryBar
        sports={sports}
        selectedSportId={sportId || "all"}
        onSelectSport={handleSelectSport}
        currentPage={categoryPage}
        totalPages={categoryTotalPages}
        onPageChange={setCategoryPage}
        isLoading={isSportsLoading}
        hasNextPage={sportsRes?.data?.pagination?.hasNextPage}
        hasPrevPage={sportsRes?.data?.pagination?.hasPrevPage}
      />

      <TournamentGrid
        tournaments={tournaments}
        isLoading={isLoading}
        getSportName={getSportName}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={tournamentPage}
        totalPages={tournamentTotalPages}
        onPageChange={setTournamentPage}
      />
    </div>
  );
};

export default TournamentList;
