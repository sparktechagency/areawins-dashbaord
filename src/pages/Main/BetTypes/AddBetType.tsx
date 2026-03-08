import { useCreateBetTypeMutation } from "@/redux/features/betType/betTypeApi";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { BetTypeFormValues } from "@/validation/betType";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import BetTypeForm from "./BetTypeForm";

const AddBetType: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sportId = searchParams.get("sportId");

  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const sports = sportsRes?.data?.results || [];

  const [createBetType, { isLoading: isCreating }] = useCreateBetTypeMutation();

  const onSubmit = async (data: BetTypeFormValues) => {
    try {
      await createBetType(data).unwrap();
      toast.success("Bet Type created successfully");
      if (sportId) {
        navigate(`/categories/${sportId}/bet-types`);
      } else {
        navigate("/bet-types");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create bet type");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <BetTypeForm
        title="Add New Bet Type"
        sports={sports}
        isLoading={isCreating}
        onSubmit={onSubmit}
        initialSportId={sportId || undefined}
      />
    </div>
  );
};

export default AddBetType;
