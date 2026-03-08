import { useCreateMatchMutation } from "@/redux/features/match/matchApi";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { useGetAllTeamsQuery } from "@/redux/features/team/teamApi";
import { useGetAllTournamentsQuery } from "@/redux/features/tournament/tournamentApi";
import { MatchFormValues } from "@/validation/match";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MatchForm from "./MatchForm";

const AddMatch: React.FC = () => {
  const navigate = useNavigate();
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const { data: tournamentsRes } = useGetAllTournamentsQuery({});
  const { data: teamsRes } = useGetAllTeamsQuery({});

  const sports = sportsRes?.data?.results || [];
  const tournaments = tournamentsRes?.data?.results || [];
  const teams = teamsRes?.data?.results || [];

  const [createMatch, { isLoading: isCreating }] = useCreateMatchMutation();

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
      await createMatch(payload).unwrap();
      toast.success("Match scheduled successfully");
      navigate("/match-management");
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <MatchForm
        title="Schedule New Match"
        sports={sports}
        tournaments={tournaments}
        teams={teams}
        isLoading={isCreating}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddMatch;
