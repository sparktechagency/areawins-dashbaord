import { Button } from "@/components/ui/button";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import {
  useCreateTournamentMutation,
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
  useUpdateTournamentMutation,
} from "@/redux/features/tournament/tournamentApi";
import {
  TournamentFormValues,
  tournamentSchema,
} from "@/validation/tournament";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SportCategoryBar from "./SportCategoryBar";
import TournamentFormDialog from "./TournamentFormDialog";
import TournamentGrid from "./TournamentGrid";

const TournamentManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
  const [categoryPage, setCategoryPage] = useState(1);
  const [tournamentPage, setTournamentPage] = useState(1);
  const CATEGORY_LIMIT = 10;
  const TOURNAMENT_LIMIT = 12;

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

  // Auto-select first sport category if none selected
  React.useEffect(() => {
    if (sports.length > 0 && !selectedSportId) {
      setSelectedSportId(sports[0]._id);
    }
  }, [sports, selectedSportId]);

  const { data: tournamentsRes, isLoading } = useGetAllTournamentsQuery(
    selectedSportId
      ? {
          sport: selectedSportId,
          page: tournamentPage,
          limit: TOURNAMENT_LIMIT,
        }
      : { page: tournamentPage, limit: TOURNAMENT_LIMIT },
    { skip: !selectedSportId },
  );
  const tournamentTotalPages = getPages(tournamentsRes, TOURNAMENT_LIMIT);
  const [createTournament, { isLoading: isCreating }] =
    useCreateTournamentMutation();
  const [updateTournament, { isLoading: isUpdating }] =
    useUpdateTournamentMutation();
  const [deleteTournament] = useDeleteTournamentMutation();

  const tournaments = tournamentsRes?.data?.results || [];
  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema) as any,
    defaultValues: {
      name: "",
      sport: selectedSportId || "",
      type: "league",
      description: "",
      startDate: "",
      endDate: "",
      year: "",
      country: "",
      isFeatured: false,
      logo: "",
    },
  });

  // Update sport in form when selectedSportId changes
  React.useEffect(() => {
    if (selectedSportId && !editingId) {
      form.setValue("sport", selectedSportId);
      setTournamentPage(1);
    }
  }, [selectedSportId, form, editingId]);

  const getSportName = (id: string) => {
    return sports.find((s: any) => s._id === id)?.name || "Unknown Sport";
  };

  const onSubmit = async (data: TournamentFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        if (val instanceof File) {
          formData.append(key, val);
        } else {
          formData.append(key, String(val));
        }
      }
    });

    try {
      if (editingId) {
        await updateTournament({ id: editingId, data: formData }).unwrap();
        toast.success("Tournament updated successfully");
      } else {
        await createTournament(formData).unwrap();
        toast.success("Tournament created successfully");
      }
      setIsModalOpen(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tournament?")) {
      try {
        await deleteTournament(id).unwrap();
        toast.success("Tournament deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete");
      }
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      name: "",
      sport: selectedSportId || "",
      type: "league",
      description: "",
      startDate: "",
      endDate: "",
      year: "",
      country: "",
      isFeatured: false,
      logo: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (t: any) => {
    setEditingId(t._id);
    form.reset({
      name: t.name,
      sport: t.sport?._id || t.sport,
      type: t.type,
      description: t.description || "",
      startDate: t.startDate || "",
      endDate: t.endDate || "",
      year: t.year || "",
      country: t.country,
      isFeatured: t.isFeatured,
      logo: t.logo,
    });
    setIsModalOpen(true);
  };

  console.log("tournamentTotalPages", tournamentTotalPages);
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Tournament Manager
          </h1>
          <p className="text-slate-500 font-medium">
            Manage leagues, cups, and tournaments by sport category.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          New Tournament
        </Button>
      </div>

      <SportCategoryBar
        sports={sports}
        selectedSportId={selectedSportId}
        onSelectSport={setSelectedSportId}
        currentPage={categoryPage}
        totalPages={categoryTotalPages}
        onPageChange={setCategoryPage}
      />

      <TournamentGrid
        tournaments={tournaments}
        isLoading={isLoading}
        getSportName={getSportName}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={tournamentPage}
        totalPages={tournamentTotalPages}
        onPageChange={setTournamentPage}
      />

      <TournamentFormDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingId={editingId}
        form={form}
        sports={sports}
        onSubmit={onSubmit}
        isSaving={isCreating || isUpdating}
      />
    </div>
  );
};

export default TournamentManagement;
