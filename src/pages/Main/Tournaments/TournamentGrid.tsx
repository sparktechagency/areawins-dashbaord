import Pagination from "@/components/common/Pagination";
import TournamentSkeleton from "@/components/skeletons/TournamentSkeleton";
import React from "react";
import TournamentCard from "./TournamentCard";

interface TournamentGridProps {
  tournaments: any[];
  isLoading: boolean;
  getSportName: (id: string) => string;
  onEdit: (t: any) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TournamentGrid: React.FC<TournamentGridProps> = ({
  tournaments,
  isLoading,
  getSportName,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TournamentSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {tournaments.length === 0 ? (
          <p className="col-span-full text-center text-slate-400 py-12">
            No tournaments found for this category. Create one to get started.
          </p>
        ) : (
          tournaments.map((t: any) => (
            <TournamentCard
              key={t._id}
              tournament={t}
              sportName={getSportName(t.sport?._id || t.sport)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* Tournament Pagination */}
      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default TournamentGrid;
