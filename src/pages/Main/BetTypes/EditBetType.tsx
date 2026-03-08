import FormSkeleton from "@/components/skeletons/FormSkeleton";
import {
  useGetSingleBetTypeQuery,
  useUpdateBetTypeMutation,
} from "@/redux/features/betType/betTypeApi";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { BetTypeFormValues } from "@/validation/betType";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BetTypeForm from "./BetTypeForm";

const EditBetType: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: betTypeRes, isLoading: isBetTypeLoading } =
    useGetSingleBetTypeQuery(id);
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const sports = sportsRes?.data?.results || [];

  const [updateBetType, { isLoading: isUpdating }] = useUpdateBetTypeMutation();

  const betTypeData = betTypeRes?.data;

  const onSubmit = async (data: BetTypeFormValues) => {
    try {
      await updateBetType({ id: id!, data }).unwrap();
      toast.success("Bet Type updated successfully");
      navigate(-1);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update bet type");
    }
  };

  if (isBetTypeLoading) {
    return (
      <div className="p-4 md:p-8">
        <FormSkeleton fields={6} columns={2} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <BetTypeForm
        title="Edit Bet Type"
        initialData={betTypeData}
        sports={sports}
        isLoading={isUpdating}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditBetType;
