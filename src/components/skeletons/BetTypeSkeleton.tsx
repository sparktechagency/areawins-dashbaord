import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BetTypeSkeleton: React.FC = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-1/2 rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="size-8 rounded" />
          <Skeleton className="size-8 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Skeleton className="h-3 w-24 rounded" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetTypeSkeleton;
