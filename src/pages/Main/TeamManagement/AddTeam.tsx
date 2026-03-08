import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { useCreateTeamMutation } from "@/redux/features/team/teamApi";
import { TeamFormValues } from "@/validation/team";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import TeamForm from "./TeamForm";

const AddTeam: React.FC = () => {
  const navigate = useNavigate();
  const { sportId, tournamentId } = useParams<{
    sportId: string;
    tournamentId: string;
  }>();

  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const sports = sportsRes?.data?.results || [];

  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();

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
      await createTeam(formData).unwrap();
      toast.success("Team created successfully");
      handleBack();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <TeamForm
        title="Add New Team"
        sports={sports}
        sportId={sportId}
        tournamentId={tournamentId}
        isLoading={isCreating}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddTeam;
