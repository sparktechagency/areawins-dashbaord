import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { betTypeService } from "@/services/mockData";
import { BetTypeFormValues } from "@/validation/betType";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BetTypeForm from "./BetTypeForm";

const EditBetType: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [betType, setBetType] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const sports = sportsRes?.data?.results || [];

  useEffect(() => {
    if (id) {
      const data = betTypeService.getById(id);
      if (data) {
        setBetType(data);
      } else {
        toast.error("Bet Type not found");
        navigate("/bet-types");
      }
      setIsLoading(false);
    }
  }, [id, navigate]);

  const onSubmit = async (data: BetTypeFormValues) => {
    const updated = betTypeService.update(id!, data);
    if (updated) {
      toast.success("Bet Type updated successfully");
      navigate("/bet-types");
    } else {
      toast.error("Failed to update bet type");
    }
  };

  if (isLoading) {
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
        initialData={betType}
        sports={sports}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditBetType;
