import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { Button } from "@/components/ui/button";
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
  const { data: sportsRes } = useGetAllSportCategoriesQuery({ limit: 100 });
  const [updateBetType, { isLoading: isUpdating }] = useUpdateBetTypeMutation();

  const betTypeData = betTypeRes?.data;
  const isDataLoading = isBetTypeLoading || !betTypeData;
  const sports = sportsRes?.data?.results || [];

  const onSubmit = async (data: BetTypeFormValues) => {
    try {
      await updateBetType({ id: id!, data }).unwrap();
      toast.success("Bet Type updated successfully");
      navigate(-1);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update bet type");
    }
  };

  if (isDataLoading) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl  tracking-tighter mb-2 text-slate-300">
              Edit Bet Type
            </h1>
            <p className="text-slate-200 font-medium">Loading details...</p>
          </div>
        </div>
        <FormSkeleton fields={6} columns={2} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl  tracking-tighter mb-2">
            Edit Bet Type
          </h1>
          <p className="text-slate-500 font-medium">
            Update the details of the bet type.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          Go Back
        </Button>
      </div>

      <BetTypeForm
        initialData={betTypeData}
        sports={sports}
        isLoading={isUpdating}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditBetType;
