import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SportCategoryBar from "./SportCategoryBar";

const TournamentManagement: React.FC = () => {
  const navigate = useNavigate();
  const [categoryPage, setCategoryPage] = useState(1);
  const CATEGORY_LIMIT = 50;
  const { data: sportsRes } = useGetAllSportCategoriesQuery({
    page: categoryPage,
    limit: CATEGORY_LIMIT,
  });
  const sports = sportsRes?.data?.results || [];

  // Robust metadata detection with specific pagination structure
  const getPages = (res: any, limit: number) => {
    const pagination =
      res?.data?.pagination || res?.data?.meta || res?.data || {};
    const totalPages = pagination.totalPages;
    if (totalPages !== undefined) return totalPages;

    const total =
      pagination.totalResult ||
      pagination.total ||
      pagination.totalCount ||
      pagination.count ||
      0;
    return Math.ceil(total / limit) || 1;
  };

  const categoryTotalPages = getPages(sportsRes, CATEGORY_LIMIT);

  const handleSelectSport = (id: string) => {
    navigate(`/tournaments/${id}`);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Tournament Manager
          </h1>
          <p className="text-slate-500 font-medium">
            Select a sport category to manage its tournaments, leagues, and
            cups.
          </p>
        </div>
      </div>
      <SportCategoryBar
        sports={sports}
        selectedSportId={null}
        onSelectSport={handleSelectSport}
        currentPage={categoryPage}
        totalPages={categoryTotalPages}
        onPageChange={setCategoryPage}
      />
    </div>
  );
};

export default TournamentManagement;
