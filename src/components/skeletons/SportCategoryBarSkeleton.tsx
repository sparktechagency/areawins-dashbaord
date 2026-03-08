import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SportCategoryBarSkeleton: React.FC = () => {
  return (
    <div className="flex overflow-x-auto pb-4 mb-4 gap-4 no-scrollbar animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="shrink-0 flex gap-2 items-center p-2 rounded border border-transparent"
        >
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      ))}
    </div>
  );
};

export default SportCategoryBarSkeleton;
