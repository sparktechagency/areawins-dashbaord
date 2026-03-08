import Pagination from "@/components/common/Pagination";
import SportCategoryBarSkeleton from "@/components/skeletons/SportCategoryBarSkeleton";
import React from "react";

interface SportCategoryBarProps {
  sports: any[];
  selectedSportId: string | null;
  onSelectSport: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const SportCategoryBar: React.FC<SportCategoryBarProps> = ({
  sports,
  selectedSportId,
  onSelectSport,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  if (isLoading) {
    return <SportCategoryBarSkeleton />;
  }

  return (
    <>
      <div className="flex overflow-x-auto pb-4 mb-4 gap-4 no-scrollbar">
        <button
          onClick={() => onSelectSport("all")}
          className={`shrink-0 flex  gap-2 items-center p-2 cursor-pointer rounded border ${
            selectedSportId === "all" ? "border-primary" : "border-transparent"
          }`}
        >
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span className="text-xs font-bold  text-slate-500">All</span>
        </button>

        {sports?.map((sport: any) => (
          <button
            key={sport._id}
            onClick={() => onSelectSport(sport._id)}
            className={`shrink-0 flex  gap-2 items-center p-2 cursor-pointer rounded border ${
              selectedSportId === sport._id
                ? "border-primary"
                : "border-transparent"
            }`}
          >
            <img
              src={sport.icon}
              alt={sport.name}
              className={`size-5 object-contain`}
            />
            <span className="text-xs font-bold  text-slate-500">
              {sport.name}
            </span>
          </button>
        ))}
      </div>

      {/* Category Pagination */}
      <div className="mb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default SportCategoryBar;
