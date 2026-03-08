import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface FormSkeletonProps {
  fields?: number;
  columns?: 1 | 2;
  className?: string;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({
  fields = 4,
  columns = 1,
  className = "",
}) => {
  return (
    <div className={`p-4 md:p-8 max-w-4xl mx-auto animate-pulse ${className}`}>
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-3">
          <Skeleton className="h-10 md:h-12 w-48 md:w-64 rounded" />
          <Skeleton className="h-4 w-64 md:w-80 rounded" />
        </div>
        <Skeleton className="h-10 w-24 rounded" />
      </div>

      {/* Form Content Skeleton */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
        <div
          className={`grid gap-6 ${columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
        >
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          ))}
        </div>

        {/* Image/Textarea Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 flex-1 rounded-md" />
          <Skeleton className="h-12 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;
