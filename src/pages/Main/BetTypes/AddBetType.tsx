import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { betTypeService } from "@/services/mockData";
import { BetTypeFormValues } from "@/validation/betType";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BetTypeForm from "./BetTypeForm";

const AddBetType: React.FC = () => {
  const navigate = useNavigate();
  const { data: sportsRes } = useGetAllSportCategoriesQuery({});
  const sports = sportsRes?.data?.results || [];

  const onSubmit = async (data: BetTypeFormValues) => {
    // Check uniqueness (mock service check)
    const existing = betTypeService.getAll();
    if (existing.some((b) => b.betTypeId === data.betTypeId)) {
      toast.error("Bet Type ID must be unique");
      return;
    }

    const newBetType = betTypeService.add(data);
    if (newBetType) {
      toast.success("Bet Type created successfully");
      navigate("/bet-types");
    } else {
      toast.error("Failed to create bet type");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <BetTypeForm
        title="Add New Bet Type"
        sports={sports}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddBetType;
