import FormSkeleton from "@/components/skeletons/FormSkeleton";
import {
  useGetSingleMatchQuery,
  useUpdateMatchMutation,
} from "@/redux/features/match/matchApi";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { useGetAllTeamsQuery } from "@/redux/features/team/teamApi";
import { useGetAllTournamentsQuery } from "@/redux/features/tournament/tournamentApi";
import { MatchFormValues } from "@/validation/match";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import MatchForm from "./MatchForm";

const EditMatch: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: matchRes, isLoading: isMatchLoading } =
    useGetSingleMatchQuery(id);
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const { data: tournamentsRes } = useGetAllTournamentsQuery({});
  const { data: teamsRes } = useGetAllTeamsQuery({});

  const sports = sportsRes?.data?.results || [];
  const tournaments = tournamentsRes?.data?.results || [];
  const teams = teamsRes?.data?.results || [];

  const [updateMatch, { isLoading: isUpdating }] = useUpdateMatchMutation();

  const matchData = matchRes?.data;

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
      await updateMatch({ id: id!, data: payload }).unwrap();
      toast.success("Match updated successfully");
      navigate("/match-management");
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  if (isMatchLoading) {
    return (
      <div className="p-4 md:p-8">
        <FormSkeleton fields={8} columns={2} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <MatchForm
        title="Edit Match"
        initialData={matchData}
        sports={sports}
        tournaments={tournaments}
        teams={teams}
        isLoading={isUpdating}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditMatch;
