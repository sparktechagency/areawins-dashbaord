import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { MatchFormValues, matchSchema } from "@/validation/match";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface MatchFormProps {
  initialData?: any;
  sports: any[];
  tournaments: any[];
  teams: any[];
  isLoading?: boolean;
  onSubmit: (data: MatchFormValues) => void;
  title?: string;
}

const STATUSES = ["scheduled", "live", "finished", "cancelled", "postponed"];

const MatchForm: React.FC<MatchFormProps> = ({
  initialData,
  sports,
  tournaments,
  teams,
  isLoading,
  onSubmit,
  title,
}) => {
  const navigate = useNavigate();
  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema) as any,
    defaultValues: {
      sport: initialData?.sport?._id || initialData?.sport || "",
      tournament:
        initialData?.tournament?._id || initialData?.tournament || "none",
      homeTeam: initialData?.homeTeam?._id || initialData?.homeTeam || "",
      awayTeam: initialData?.awayTeam?._id || initialData?.awayTeam || "",
      scheduledStartTime: initialData?.scheduledStartTime
        ? new Date(initialData.scheduledStartTime).toISOString().slice(0, 16)
        : "",
      status: initialData?.status || "scheduled",
      isFeatured: initialData?.isFeatured || false,
      homeScore: initialData?.liveStatus?.homeScore || 0,
      awayScore: initialData?.liveStatus?.awayScore || 0,
    },
  });

  const selectedSport = form.watch("sport");
  const selectedStatus = form.watch("status");

  useEffect(() => {
    if (initialData) {
      form.reset({
        sport: initialData.sport?._id || initialData.sport,
        tournament:
          initialData.tournament?._id || initialData.tournament || "none",
        homeTeam: initialData.homeTeam?._id || initialData.homeTeam,
        awayTeam: initialData.awayTeam?._id || initialData.awayTeam,
        scheduledStartTime: initialData.scheduledStartTime
          ? new Date(initialData.scheduledStartTime).toISOString().slice(0, 16)
          : "",
        status: initialData.status,
        isFeatured: initialData.isFeatured,
        homeScore: initialData.liveStatus?.homeScore || 0,
        awayScore: initialData.liveStatus?.awayScore || 0,
      });
    }
  }, [initialData, form]);

  return (
    <div className="max-w-4xl mx-auto">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-6 bg-white rounded-xl border border-slate-100  space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sport</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tournament"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Tournament (Optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None / Friendly</SelectItem>
                      {tournaments
                        .filter(
                          (t: any) =>
                            !selectedSport ||
                            (t.sport?._id || t.sport) === selectedSport,
                        )
                        .map((t: any) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="homeTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Team</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select Home Team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams
                          .filter(
                            (t: any) =>
                              !selectedSport ||
                              (t.sport?._id || t.sport) === selectedSport,
                          )
                          .map((t: any) => (
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
                name="awayTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Away Team</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select Away Team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams
                          .filter(
                            (t: any) =>
                              (!selectedSport ||
                                (t.sport?._id || t.sport) === selectedSport) &&
                              t._id !== form.getValues("homeTeam"),
                          )
                          .map((t: any) => (
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
            </div>

            <FormField
              control={form.control}
              name="scheduledStartTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(selectedStatus === "live" || selectedStatus === "finished") && (
              <div className="p-4 bg-slate-50 border rounded space-y-4">
                <FormLabel className="text-xs font-bold text-slate-400">
                  Scores
                </FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="homeScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="h-12"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="awayScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Away Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="h-12"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
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
              {isLoading ? "Saving..." : "Save Match"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MatchForm;
