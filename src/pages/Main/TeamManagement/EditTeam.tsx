import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import {
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
} from "@/redux/features/team/teamApi";
import { TeamFormValues } from "@/validation/team";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import TeamForm from "./TeamForm";

const EditTeam: React.FC = () => {
  const navigate = useNavigate();
  const { id, sportId, tournamentId } = useParams<{
    id: string;
    sportId: string;
    tournamentId: string;
  }>();

  const { data: teamRes, isLoading: isTeamLoading } = useGetSingleTeamQuery(
    id!,
  );
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const sports = sportsRes?.data?.results || [];

  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();

  const teamData = teamRes?.data;

  const handleBack = () => {
    navigate(`/categories/${sportId}/tournaments/${tournamentId}/teams`);
  };

  const onSubmit = async (data: TeamFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        if (val instanceof File) formData.append(key, val);
        else formData.append(key, String(val));
      }
    });

    try {
      await updateTeam({ id: id!, data: formData }).unwrap();
      toast.success("Team updated successfully");
      handleBack();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  if (isTeamLoading) {
    return (
      <div className="p-4 md:p-8">
        <FormSkeleton fields={8} columns={2} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <TeamForm
        title="Edit Team"
        initialData={teamData}
        sports={sports}
        sportId={sportId}
        tournamentId={tournamentId}
        isLoading={isUpdating}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditTeam;
