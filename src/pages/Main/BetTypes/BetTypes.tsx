import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteBetTypeMutation,
  useGetAllBetTypesQuery,
} from "@/redux/features/betType/betTypeApi";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import SportCategoryBar from "../Tournaments/SportCategoryBar";

const BetTypes: React.FC = () => {
  const { sportId } = useParams<{ sportId: string }>();
  const navigate = useNavigate();
  const [categoryPage, setCategoryPage] = useState(1);
  const CATEGORY_LIMIT = 50;

  const { data: sportsRes, isLoading: isSportsLoading } =
    useGetAllSportCategoriesQuery({
      page: categoryPage,
      limit: CATEGORY_LIMIT,
    });
  const sports = sportsRes?.data?.results || [];

  const currentSport = sports.find((s: any) => s._id === sportId);

  const betTypeParams: any = {};
  if (sportId && sportId !== "all") {
    betTypeParams.sport = sportId;
  }

  const { data: betTypesRes, isLoading: isBetTypesLoading } =
    useGetAllBetTypesQuery(betTypeParams);
  const betTypes = betTypesRes?.data?.results || [];

  const [deleteBetType, { isLoading: isDeleting }] = useDeleteBetTypeMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string>("");

  const getSportName = (id: any) => {
    if (typeof id === "object") return id.name;
    return sports.find((s: any) => s._id === id)?.name || "Unknown Sport";
  };

  const handleDelete = (bt: any) => {
    setDeletingId(bt._id);
    setDeletingName(bt.name);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await deleteBetType(deletingId).unwrap();
      toast.success("Bet Type deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete");
    } finally {
      setDeletingId(null);
      setDeletingName("");
    }
  };

  const handleSelectSport = (id: string) => {
    if (id === "all") {
      navigate("/bet-types");
    } else {
      navigate(`/categories/${id}/bet-types`);
    }
  };

  const handleCreate = () => {
    if (sportId && sportId !== "all") {
      navigate(`/bet-types/add?sportId=${sportId}`);
    } else {
      navigate("/bet-types/add");
    }
  };

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

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            {currentSport?.name || "All"} Bet Types
          </h1>
          <p className="text-slate-500 font-medium">
            Define bet types and their potential outcomes for{" "}
            {currentSport?.name || "all sports"}.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Bet Type
        </Button>
      </div>

      <SportCategoryBar
        sports={sports}
        selectedSportId={sportId}
        onSelectSport={handleSelectSport}
        currentPage={categoryPage}
        totalPages={categoryTotalPages}
        onPageChange={setCategoryPage}
        isLoading={isSportsLoading}
        hasNextPage={sportsRes?.data?.pagination?.hasNextPage}
        hasPrevPage={sportsRes?.data?.pagination?.hasPrevPage}
      />

      {isBetTypesLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {betTypes.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-12">
              No bet types found for this category.
            </p>
          ) : (
            betTypes.map((bt: any) => (
              <Card
                key={bt._id}
                className={`group transition-all duration-300 hover:scale-[1.02] hover:border-primary ${
                  !bt.isActive ? "opacity-60 grayscale" : ""
                }`}
              >
                <CardHeader className="flex flex-row items-start justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-black">
                      {bt.name}
                    </CardTitle>
                    <div className="text-sm text-slate-500 font-bold mt-1">
                      {getSportName(bt.sport)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => navigate(`/bet-types/edit/${bt._id}`)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(bt)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {bt.outcomes.map((o: any) => (
                        <Badge
                          key={o.outcomeId}
                          variant="secondary"
                          className="px-2 py-1"
                        >
                          {o.label}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-slate-100">
                      <span>{bt.betTypeId}</span>
                      <div className="flex gap-2">
                        {bt.isDefault && (
                          <Badge
                            variant="outline"
                            className="border-primary text-primary"
                          >
                            Default
                          </Badge>
                        )}
                        <Badge variant={bt.isActive ? "default" : "secondary"}>
                          {bt.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deletingId}
        itemName={deletingName}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeletingId(null);
          setDeletingName("");
        }}
      />
    </div>
  );
};

export default BetTypes;
