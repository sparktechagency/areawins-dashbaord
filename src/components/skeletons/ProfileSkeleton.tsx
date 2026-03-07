import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48 rounded" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded p-8 flex flex-col items-center text-center ">
            <Skeleton className="size-32 rounded-full mb-6 border-4 border-slate-50" />
            <Skeleton className="h-8 w-40 mb-3 rounded" />
            <Skeleton className="h-6 w-24 rounded-full border border-gray-100" />

            <div className="w-full mt-8 pt-6 border-t border-gray-50 space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center px-1">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50/30 border border-red-50 rounded p-6 mt-2">
            <Skeleton className="h-4 w-28 mb-4 rounded bg-red-100/50" />
            <Skeleton className="h-3 w-full mb-2 rounded bg-red-100/30" />
            <Skeleton className="h-3 w-3/4 mb-5 rounded bg-red-100/30" />
            <Skeleton className="h-10 w-full rounded bg-white border border-red-100" />
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-100 rounded p-8 h-fit ">
            <div className="flex items-center gap-3 mb-10">
              <Skeleton className="size-6 rounded bg-primary/10" />
              <Skeleton className="h-7 w-52 rounded" />
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-24 rounded bg-slate-100" />
                  <Skeleton className="h-[52px] w-full rounded " />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-28 rounded bg-slate-100" />
                  <Skeleton className="h-[52px] w-full rounded " />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="h-3 w-36 rounded bg-slate-100" />
                <Skeleton className="h-[52px] w-full rounded " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
