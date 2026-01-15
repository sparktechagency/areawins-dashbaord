import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  matchService,
  sportService,
  teamService,
  tournamentService,
} from "../../services/mockData";
import { Match, Sport, Team, Tournament } from "../../types/schema";

const matchSchema = z
  .object({
    matchId: z.string().min(1, "ID is required"),
    sport: z.string().min(1, "Sport is required"),
    tournament: z.string().optional(),
    homeTeam: z.string().min(1, "Home Team is required"),
    awayTeam: z.string().min(1, "Away Team is required"),
    scheduledStartTime: z.string().min(1, "Start Time is required"),
    status: z.enum(["scheduled", "live", "finished", "cancelled", "postponed"]),
    isFeatured: z.boolean().default(false),
    isResultVerified: z.boolean().default(false),
    homeScore: z.coerce.number().int().min(0).default(0),
    awayScore: z.coerce.number().int().min(0).default(0),
  })
  .refine((data) => data.homeTeam !== data.awayTeam, {
    message: "Home and Away teams cannot be the same",
    path: ["awayTeam"],
  });

type MatchFormValues = z.infer<typeof matchSchema>;

const MatchManagement: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      matchId: "",
      sport: "",
      tournament: "",
      homeTeam: "",
      awayTeam: "",
      scheduledStartTime: "",
      status: "scheduled",
      isFeatured: false,
      isResultVerified: false,
      homeScore: 0,
      awayScore: 0,
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setMatches(matchService.getAll());
    setSports(sportService.getAll());
    setTournaments(tournamentService.getAll());
    setTeams(teamService.getAll());
  };

  const getSportName = (id: string) =>
    sports.find((s) => s._id === id)?.name || "Unknown";
  const getTournamentName = (id?: string) =>
    id ? tournaments.find((t) => t._id === id)?.name : "Friendly/Other";
  const getTeam = (id: string) => teams.find((t) => t._id === id);

  const onSubmit = (data: MatchFormValues) => {
    const payload = {
      matchId: data.matchId,
      sport: data.sport,
      tournament: data.tournament === "none" ? undefined : data.tournament,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      scheduledStartTime: new Date(data.scheduledStartTime),
      status: data.status,
      isFeatured: data.isFeatured,
      isResultVerified: data.isResultVerified,
      liveStatus:
        data.status === "live" || data.status === "finished"
          ? {
              homeScore: data.homeScore,
              awayScore: data.awayScore,
              lastUpdated: new Date(),
            }
          : undefined,
      source: "manual",
      totalBetsCount: 0,
      createdBy: "admin_user",
      finalResult:
        data.status === "finished"
          ? `${data.homeScore}-${data.awayScore}`
          : undefined,
    } as any; // Allow partial mock structure

    if (editingId) {
      const updated = matchService.update(editingId, payload);
      if (updated) {
        toast.success("Match updated successfully");
        loadData();
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update match");
      }
    } else {
      if (matches.some((m) => m.matchId === data.matchId)) {
        form.setError("matchId", { message: "ID must be unique" });
        return;
      }
      const newMatch = matchService.add(payload);
      if (newMatch) {
        toast.success("Match created successfully");
        loadData();
        setIsModalOpen(false);
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this match?")) {
      const success = matchService.delete(id);
      if (success) {
        toast.success("Match deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete match");
      }
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      matchId: `MATCH-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(5, "0")}`,
      sport: "",
      tournament: "",
      homeTeam: "",
      awayTeam: "",
      scheduledStartTime: "",
      status: "scheduled",
      isFeatured: false,
      isResultVerified: false,
      homeScore: 0,
      awayScore: 0,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (m: Match) => {
    setEditingId(m._id);
    form.reset({
      matchId: m.matchId,
      sport: m.sport,
      tournament: m.tournament || "none",
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      scheduledStartTime: m.scheduledStartTime
        ? new Date(m.scheduledStartTime).toISOString().slice(0, 16)
        : "",
      status: m.status,
      isFeatured: m.isFeatured,
      isResultVerified: m.isResultVerified,
      homeScore: m.liveStatus?.homeScore || 0,
      awayScore: m.liveStatus?.awayScore || 0,
    });
    setIsModalOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  // Watch sport to filter tournaments and teams
  const selectedSport = form.watch("sport");
  const selectedStatus = form.watch("status");

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Match Management
          </h1>
          <p className="text-slate-500 font-medium">
            Schedule and manage match events and results.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-secondary hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg mr-2">
            add_circle
          </span>
          Schedule Match
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((m) => {
          const home = getTeam(m.homeTeam);
          const away = getTeam(m.awayTeam);
          return (
            <Card
              key={m._id}
              className={m.status === "finished" ? "opacity-80" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline">{getSportName(m.sport)}</Badge>
                  <Badge
                    className={
                      m.status === "live"
                        ? "bg-red-500 animate-pulse text-white"
                        : "bg-slate-100 text-slate-600"
                    }
                  >
                    {m.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-center text-slate-400 font-bold uppercase tracking-wider mb-4">
                  {getTournamentName(m.tournament)}
                </div>
                <div className="flex justify-between items-center px-4">
                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center p-2 border">
                      {home?.logo ? (
                        <img
                          src={home.logo}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        "🏠"
                      )}
                    </div>
                    <span className="text-xs font-black text-center leading-tight">
                      {home?.name}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-black tabular-nums">
                      {m.status === "live" || m.status === "finished"
                        ? `${m.liveStatus?.homeScore ?? 0} - ${
                            m.liveStatus?.awayScore ?? 0
                          }`
                        : "VS"}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {formatDate(m.scheduledStartTime)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center p-2 border">
                      {away?.logo ? (
                        <img
                          src={away.logo}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        "✈️"
                      )}
                    </div>
                    <span className="text-xs font-black text-center leading-tight">
                      {away?.name}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <div className="text-xs text-slate-400 font-mono">
                    {m.matchId}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(m)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(m._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Match" : "Schedule Match"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="matchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Match ID</FormLabel>
                      <FormControl>
                        <Input placeholder="MATCH-123456" {...field} />
                      </FormControl>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "scheduled",
                            "live",
                            "finished",
                            "cancelled",
                            "postponed",
                          ].map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="capitalize"
                            >
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Sport" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sports.map((s) => (
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
                      <FormLabel>Tournament</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Tournament" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None / Friendly</SelectItem>
                          {tournaments
                            .filter(
                              (t) => !selectedSport || t.sport === selectedSport
                            )
                            .map((t) => (
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="homeTeam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Team</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Home Team" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams
                            .filter(
                              (t) => !selectedSport || t.sport === selectedSport
                            )
                            .map((t) => (
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Away Team" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams
                            .filter(
                              (t) =>
                                (!selectedSport || t.sport === selectedSport) &&
                                t._id !== form.getValues("homeTeam")
                            )
                            .map((t) => (
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
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Live Status Section */}
              {(selectedStatus === "live" || selectedStatus === "finished") && (
                <div className="p-4 bg-slate-50/50 rounded-xl space-y-4 border">
                  <FormLabel className="uppercase text-xs font-bold text-slate-400">
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

              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
                <FormField
                  control={form.control}
                  name="isResultVerified"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Result Verified?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Match
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchManagement;
