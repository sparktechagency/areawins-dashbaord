import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/form";
import FormCheckbox from "@/components/form/FormCheckbox";
import FormImageUpload from "@/components/form/FormImageUpload";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGetAllSportCategoriesQuery } from "@/redux/features/sportCategory/sportCategoryApi";
import { useCreateTournamentMutation } from "@/redux/features/tournament/tournamentApi";
import {
  TournamentFormValues,
  tournamentSchema,
} from "@/validation/tournament";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Globe, Trophy, Type } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AddTournament: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sportId = searchParams.get("sportId");

  const { data: sportsRes, isLoading: isSportsLoading } =
    useGetAllSportCategoriesQuery({ limit: 100 });
  const [createTournament, { isLoading: isCreating }] =
    useCreateTournamentMutation();
  const sports = sportsRes?.data?.results || [];

  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema) as any,
    defaultValues: {
      name: "",
      sport: sportId || "",
      type: "league",
      description: "",
      startDate: "",
      endDate: "",
      year: "",
      country: "",
      isFeatured: false,
      isActive: true,
      logo: "",
    },
  });

  if (isSportsLoading) return <FormSkeleton fields={8} columns={2} />;

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
      await createTournament(formData).unwrap();
      toast.success("Tournament created successfully");
      navigate("/tournaments");
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            New Tournament
          </h1>
          <p className="text-slate-500 font-medium">
            Fill in the details to create a new tournament.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          Go Back
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                control={form.control}
                name="sport"
                label="Sport Category"
                placeholder="Select Sport"
                options={sports.map((s: any) => ({
                  label: s.name,
                  value: s._id,
                }))}
                icon={Trophy}
                disabled={!!sportId}
                required
              />

              <FormSelect
                control={form.control}
                name="type"
                label="Tournament Type"
                placeholder="Select Type"
                options={[
                  { label: "League", value: "league" },
                  { label: "Tournament", value: "tournament" },
                  { label: "Cup", value: "cup" },
                  { label: "International", value: "international" },
                  { label: "Grand Slam", value: "grand_slam" },
                  { label: "Other", value: "other" },
                ]}
                icon={Type}
                required
              />

              <FormInput
                control={form.control}
                name="name"
                label="Tournament Name"
                placeholder="Premier League 2024"
                icon={Trophy}
                required
              />

              <FormInput
                control={form.control}
                name="year"
                label="Year"
                placeholder="2026"
                icon={CalendarIcon}
              />

              <FormInput
                control={form.control}
                name="country"
                label="Country"
                placeholder="Enter Country (e.g. Albania, UK)"
                icon={Globe}
              />

              <FormDatePicker
                control={form.control}
                name="startDate"
                label="Start Date"
                placeholder="Select Start Date"
              />

              <FormDatePicker
                control={form.control}
                name="endDate"
                label="End Date"
                placeholder="Select End Date"
              />

              <FormCheckbox
                control={form.control}
                name="isFeatured"
                label="Featured Tournament?"
              />
            </div>

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              placeholder="Brief description of the tournament..."
            />

            <FormImageUpload
              control={form.control}
              name="logo"
              label="Tournament Logo"
              placeholder="Upload Tournament Logo"
              required
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 cursor-pointer"
                disabled={isCreating}
              >
                {isCreating ? "Saving..." : "Create Tournament"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTournament;
