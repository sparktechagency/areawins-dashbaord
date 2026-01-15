import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  matchService,
  sportService,
  teamService,
  tournamentService,
} from "../../services/mockData";
import {
  Match,
  MatchStatus,
  Sport,
  Team,
  Tournament,
} from "../../types/schema";

const MatchManagement: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Partial<Match> | null>(null);

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
  const getTeamName = (id: string) =>
    teams.find((t) => t._id === id)?.name || "Unknown";
  const getTeam = (id: string) => teams.find((t) => t._id === id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch) return;

    if (
      !editingMatch.matchId ||
      !editingMatch.sport ||
      !editingMatch.homeTeam ||
      !editingMatch.awayTeam ||
      !editingMatch.scheduledStartTime
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingMatch.homeTeam === editingMatch.awayTeam) {
      toast.error("Home and Away teams cannot be the same");
      return;
    }

    if (editingMatch._id) {
      const updated = matchService.update(editingMatch._id, editingMatch);
      if (updated) {
        toast.success("Match updated successfully");
        loadData();
      } else {
        toast.error("Failed to update match");
      }
    } else {
      const exists = matches.some((m) => m.matchId === editingMatch.matchId);
      if (exists) {
        toast.error("Match ID must be unique");
        return;
      }

      const newMatch = matchService.add({
        matchId: editingMatch.matchId!,
        sport: editingMatch.sport!,
        tournament: editingMatch.tournament,
        homeTeam: editingMatch.homeTeam!,
        awayTeam: editingMatch.awayTeam!,
        scheduledStartTime: new Date(editingMatch.scheduledStartTime!),
        status: editingMatch.status || "scheduled",
        source: editingMatch.source || "manual",
        availableBetTypes: editingMatch.availableBetTypes || [],
        isResultVerified: editingMatch.isResultVerified ?? false,
        totalBetsCount: 0,
        isFeatured: editingMatch.isFeatured ?? false,
        createdBy: "admin_user", // Mock
        VENUE: editingMatch.venue,
        city: editingMatch.city,
        country: editingMatch.country,
        liveStatus: editingMatch.liveStatus,
        finalResult: editingMatch.finalResult,
      } as any); // Casting as any due to partial mismatches in mock vs schema strictly, but mockService handles strict types

      if (newMatch) {
        toast.success("Match created successfully");
        loadData();
      }
    }
    setIsModalOpen(false);
    setEditingMatch(null);
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

  const openNewModal = () => {
    setEditingMatch({
      matchId: `MATCH-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(5, "0")}`,
      status: "scheduled",
      isFeatured: false,
      isResultVerified: false,
      source: "manual",
      liveStatus: { homeScore: 0, awayScore: 0, lastUpdated: new Date() },
    });
    setIsModalOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

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
          onClick={openNewModal}
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
                      onClick={() => {
                        setEditingMatch(m);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMatch?.id ? "Edit Match" : "Schedule Match"}
      >
        <form
          onSubmit={handleSave}
          className="space-y-6 py-4 px-1 max-h-[80vh] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Match ID</Label>
              <Input
                required
                value={editingMatch?.matchId || ""}
                onChange={(e) =>
                  setEditingMatch({ ...editingMatch, matchId: e.target.value })
                }
                placeholder="MATCH-123456"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={editingMatch?.status || "scheduled"}
                onValueChange={(val) =>
                  setEditingMatch({
                    ...editingMatch,
                    status: val as MatchStatus,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "scheduled",
                    "live",
                    "finished",
                    "cancelled",
                    "postponed",
                  ].map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sport</Label>
              <Select
                value={editingMatch?.sport || ""}
                onValueChange={(val) =>
                  setEditingMatch({ ...editingMatch, sport: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tournament</Label>
              <Select
                value={editingMatch?.tournament || "none"}
                onValueChange={(val) =>
                  setEditingMatch({
                    ...editingMatch,
                    tournament: val === "none" ? undefined : val,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Tournament" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None / Friendly</SelectItem>
                  {tournaments
                    .filter(
                      (t) =>
                        !editingMatch?.sport || t.sport === editingMatch.sport
                    )
                    .map((t) => (
                      <SelectItem key={t._id} value={t._id}>
                        {t.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Home Team</Label>
              <Select
                value={editingMatch?.homeTeam || ""}
                onValueChange={(val) =>
                  setEditingMatch({ ...editingMatch, homeTeam: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Home Team" />
                </SelectTrigger>
                <SelectContent>
                  {teams
                    .filter(
                      (t) =>
                        !editingMatch?.sport || t.sport === editingMatch.sport
                    )
                    .map((t) => (
                      <SelectItem key={t._id} value={t._id}>
                        {t.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Away Team</Label>
              <Select
                value={editingMatch?.awayTeam || ""}
                onValueChange={(val) =>
                  setEditingMatch({ ...editingMatch, awayTeam: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Away Team" />
                </SelectTrigger>
                <SelectContent>
                  {teams
                    .filter(
                      (t) =>
                        (!editingMatch?.sport ||
                          t.sport === editingMatch.sport) &&
                        t._id !== editingMatch?.homeTeam
                    )
                    .map((t) => (
                      <SelectItem key={t._id} value={t._id}>
                        {t.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Scheduled Start Time</Label>
            <Input
              type="datetime-local"
              required
              value={
                editingMatch?.scheduledStartTime
                  ? new Date(editingMatch.scheduledStartTime)
                      .toISOString()
                      .slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setEditingMatch({
                  ...editingMatch,
                  scheduledStartTime: new Date(e.target.value),
                })
              }
            />
          </div>

          {/* Live Status Section */}
          {(editingMatch?.status === "live" ||
            editingMatch?.status === "finished") && (
            <div className="p-4 bg-slate-50 rounded-xl space-y-4 border">
              <Label className="uppercase text-xs font-bold text-slate-400">
                Scores
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Home Score</Label>
                  <Input
                    type="number"
                    value={editingMatch.liveStatus?.homeScore ?? 0}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        liveStatus: {
                          ...editingMatch.liveStatus!,
                          homeScore: parseInt(e.target.value),
                          lastUpdated: new Date(),
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Away Score</Label>
                  <Input
                    type="number"
                    value={editingMatch.liveStatus?.awayScore ?? 0}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        liveStatus: {
                          ...editingMatch.liveStatus!,
                          awayScore: parseInt(e.target.value),
                          lastUpdated: new Date(),
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="isFeatured"
                checked={editingMatch?.isFeatured ?? false}
                onCheckedChange={(checked) =>
                  setEditingMatch({
                    ...editingMatch,
                    isFeatured: checked === true,
                  })
                }
              />
              <Label htmlFor="isFeatured">Featured?</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isResultVerified"
                checked={editingMatch?.isResultVerified ?? false}
                onCheckedChange={(checked) =>
                  setEditingMatch({
                    ...editingMatch,
                    isResultVerified: checked === true,
                  })
                }
              />
              <Label htmlFor="isResultVerified">Result Verified?</Label>
            </div>
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
      </Modal>
    </div>
  );
};

export default MatchManagement;
