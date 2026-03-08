import { ImageUpload } from "@/components/common/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants/countries";
import { useGetAllTournamentsQuery } from "@/redux/features/tournament/tournamentApi";
import { TeamFormValues, teamSchema } from "@/validation/team";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface TeamFormProps {
  initialData?: any;
  sports: any[];
  sportId?: string;
  tournamentId?: string;
  isLoading?: boolean;
  onSubmit: (data: TeamFormValues) => void;
  title?: string;
}

const TeamForm: React.FC<TeamFormProps> = ({
  initialData,
  sports,
  sportId,
  tournamentId,
  isLoading,
  onSubmit,
  title,
}) => {
  const navigate = useNavigate();
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      sport: initialData?.sport?._id || initialData?.sport || sportId || "",
      tournament:
        initialData?.tournament?._id ||
        initialData?.tournament ||
        tournamentId ||
        "",
      shortName: initialData?.shortName || "",
      country: initialData?.country || "",
      foundedYear: initialData?.foundedYear || "",
      logo: initialData?.logo || "",
    },
  });

  const selectedSport = form.watch("sport");
  const { data: tournamentsRes } = useGetAllTournamentsQuery(
    { sport: selectedSport },
    { skip: !selectedSport },
  );
  const tournaments = tournamentsRes?.data?.results || [];

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        sport: initialData.sport?._id || initialData.sport,
        tournament: initialData.tournament?._id || initialData.tournament,
        shortName: initialData.shortName,
        country: initialData.country,
        foundedYear: initialData.foundedYear,
        logo: initialData.logo,
      });
    }
  }, [initialData, form]);

  return (
    <div className="max-w-4xl mx-auto">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!!sportId}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sports.map((s: any) => (
                        <SelectItem key={s._id} value={s._id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tournament"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament / League</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!!tournamentId}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Tournament" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tournaments.map((t: any) => (
                        <SelectItem key={t._id} value={t._id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manchester United"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Name (Abbreviation)</FormLabel>
                  <FormControl>
                    <Input placeholder="MUN" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.name} ({c.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foundedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Founded Year</FormLabel>
                  <FormControl>
                    <Input placeholder="1878" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Logo</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Upload Team Logo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-12" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Team"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeamForm;
