import Pagination from "@/components/common/Pagination";
import React from "react";

interface SportCategoryBarProps {
  sports: any[];
  selectedSportId: string | null;
  onSelectSport: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SportCategoryBar: React.FC<SportCategoryBarProps> = ({
  sports,
  selectedSportId,
  onSelectSport,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <div className="flex overflow-x-auto pb-4 mb-4 gap-4 no-scrollbar">
        <button
          onClick={() => onSelectSport("all")}
          className={`shrink-0 flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
            selectedSportId === null || selectedSportId === "all"
              ? "bg-primary/5 border-primary shadow-sm"
              : "bg-white border-transparent hover:border-slate-200"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-lg flex items-center justify-center mb-2 transition-colors ${
              selectedSportId === null || selectedSportId === "all"
                ? "bg-primary text-white shadow-lg"
                : "bg-slate-50 text-slate-400"
            }`}
          >
            <span className="material-symbols-outlined text-3xl">
              grid_view
            </span>
          </div>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              selectedSportId === null || selectedSportId === "all"
                ? "text-primary"
                : "text-slate-500"
            }`}
          >
            All
          </span>
        </button>

        {sports.map((sport: any) => (
          <button
            key={sport._id}
            onClick={() => onSelectSport(sport._id)}
            className={`shrink-0 flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
              selectedSportId === sport._id
                ? "bg-primary/5 border-primary shadow-sm"
                : "bg-white border-transparent hover:border-slate-200"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                selectedSportId === sport._id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              {sport.icon ? (
                <img
                  src={sport.icon}
                  alt={sport.name}
                  className={`w-10 h-10 object-contain ${
                    selectedSportId === sport._id ? "brightness-0 invert" : ""
                  }`}
                />
              ) : (
                <span className="material-symbols-outlined text-3xl">
                  sports_soccer
                </span>
              )}
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                selectedSportId === sport._id
                  ? "text-primary"
                  : "text-slate-500"
              }`}
            >
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
