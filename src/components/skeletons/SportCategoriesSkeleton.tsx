import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SportCategoriesSkeleton: React.FC = () => {
  return (
    <div className="w-full p-4 md:p-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div className="space-y-3">
          <Skeleton className="h-12 w-64 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-none"
          >
            {/* Card Header */}
            <div className="flex flex-row items-center justify-between pb-4">
              <Skeleton className="size-16 rounded-2xl" />
              <div className="flex gap-1">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
              </div>
            </div>
            {/* Card Content */}
            <div className="space-y-2 mt-1">
              <Skeleton className="h-7 w-28 rounded-lg" />
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-6 w-14 rounded-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportCategoriesSkeleton;
