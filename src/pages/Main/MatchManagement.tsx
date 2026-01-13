import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Input,
  Label,
  Select,
} from "../../components/ui";
import { Match, Team } from "@/types";

const mockTeams: Team[] = [
  {
    id: "t1",
    name: "Arsenal",
    sport: "Soccer",
    country: "UK",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AR",
  },
  {
    id: "t2",
    name: "Liverpool",
    sport: "Soccer",
    country: "UK",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=LV",
  },
  {
    id: "t3",
    name: "Celtics",
    sport: "Basketball",
    country: "USA",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=BC",
  },
  {
    id: "t4",
    name: "Warriors",
    sport: "Basketball",
    country: "USA",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GW",
  },
  {
    id: "t5",
    name: "Man City",
    sport: "Soccer",
    country: "UK",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=MC",
  },
  {
    id: "t6",
    name: "Man Utd",
    sport: "Soccer",
    country: "UK",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=MU",
  },
];

const mockCategories: string[] = ["Soccer", "Basketball", "Cricket", "Tennis"];

const initialMatches: Match[] = [
  {
    id: "1",
    sport: "Soccer",
    homeTeam: "Arsenal",
    awayTeam: "Liverpool",
    homeLogo: "https://api.dicebear.com/7.x/initials/svg?seed=AR",
    awayLogo: "https://api.dicebear.com/7.x/initials/svg?seed=LV",
    score: "2 - 1",
    league: "Premier League",
    status: "Live 74'",
    isLive: true,
    pot: 145280,
    startTime: "2023-11-20T20:00",
  },
  {
    id: "2",
    sport: "Basketball",
    homeTeam: "Celtics",
    awayTeam: "Warriors",
    homeLogo: "https://api.dicebear.com/7.x/initials/svg?seed=BC",
    awayLogo: "https://api.dicebear.com/7.x/initials/svg?seed=GW",
    score: "0 - 0",
    league: "NBA • Regular Season",
    status: "Upcoming",
    isLive: false,
    pot: 82000,
    startTime: "2023-11-21T04:30",
  },
];

const MatchManagement: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Partial<Match> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const hTeam = mockTeams.find((t) => t.name === editingMatch?.homeTeam);
    const aTeam = mockTeams.find((t) => t.name === editingMatch?.awayTeam);

    const matchData = {
      ...editingMatch,
      homeLogo:
        hTeam?.logo || "https://api.dicebear.com/7.x/initials/svg?seed=H",
      awayLogo:
        aTeam?.logo || "https://api.dicebear.com/7.x/initials/svg?seed=A",
    };

    if (editingMatch?.id) {
      setMatches((prev) =>
        prev.map((m) => (m.id === editingMatch.id ? (matchData as Match) : m))
      );
    } else {
      setMatches((prev) => [
        ...prev,
        {
          ...matchData,
          id: Date.now().toString(),
          score: "0 - 0",
          isLive: false,
          pot: 0,
          status: "Scheduled",
        } as Match,
      ]);
    }
    setIsModalOpen(false);
    setEditingMatch(null);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Match Events
          </h1>
          <p className="text-slate-500 font-medium">
            Oversee real-time sports data and market entries.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2 px-6">
            <span className="material-symbols-outlined text-lg">sync</span>{" "}
            Refresh
          </Button>
          <Button
            variant="accent"
            onClick={() => {
              setEditingMatch({ sport: "Soccer", status: "Upcoming" });
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none gap-2 px-8"
          >
            <span className="material-symbols-outlined text-lg">
              add_circle
            </span>{" "}
            Schedule Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {matches.map((match) => (
          <Card
            key={match.id}
            className="group hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 overflow-hidden border-slate-100"
          >
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
              <Badge variant="secondary" className="bg-white border-slate-200">
                {match.sport} • {match.league}
              </Badge>
              <div className="flex items-center gap-2">
                {match.isLive && (
                  <span className="size-2 rounded-full bg-accent animate-pulse"></span>
                )}
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    match.isLive ? "text-accent" : "text-slate-400"
                  }`}
                >
                  {match.status}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className="size-16 rounded-full bg-white border border-slate-100 flex items-center justify-center p-2 shadow-sm group-hover:scale-110 transition-transform">
                    <img
                      className="w-12 h-12 object-contain"
                      src={match.homeLogo}
                      alt={match.homeTeam}
                    />
                  </div>
                  <span className="text-xs font-black leading-tight text-center">
                    {match.homeTeam}
                  </span>
                </div>
                <div className="flex flex-col items-center px-4">
                  <span className="text-4xl font-black tabular-nums tracking-tighter text-slate-900">
                    {match.score}
                  </span>
                  {!match.isLive && (
                    <span className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest">
                      {formatDate(match.startTime)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className="size-16 rounded-full bg-white border border-slate-100 flex items-center justify-center p-2 shadow-sm group-hover:scale-110 transition-transform">
                    <img
                      className="w-12 h-12 object-contain"
                      src={match.awayLogo}
                      alt={match.awayTeam}
                    />
                  </div>
                  <span className="text-xs font-black leading-tight text-center">
                    {match.awayTeam}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-0.5 tracking-widest">
                    Prize Pool
                  </p>
                  <p className="text-xl font-black text-slate-900">
                    ${match.pot.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-full"
                    onClick={() => {
                      setEditingMatch(match);
                      setIsModalOpen(true);
                    }}
                  >
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                      edit
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-full"
                  >
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-accent">
                      monitoring
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMatch?.id ? "Edit Match" : "Schedule New Match"}
      >
        <form onSubmit={handleSave} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Sport Category</Label>
              <Select
                required
                value={editingMatch?.sport || ""}
                onChange={(e) =>
                  setEditingMatch({ ...editingMatch, sport: e.target.value })
                }
              >
                {mockCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>League Title</Label>
              <Input
                required
                value={editingMatch?.league || ""}
                onChange={(e) =>
                  setEditingMatch({ ...editingMatch, league: e.target.value })
                }
                placeholder="e.g. NBA Finals"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Home Competitor</Label>
              <Select
                required
                value={editingMatch?.homeTeam || ""}
                onChange={(e) =>
                  setEditingMatch({ ...editingMatch, homeTeam: e.target.value })
                }
              >
                <option value="">Select Team</option>
                {mockTeams
                  .filter((t) => t.sport === editingMatch?.sport)
                  .map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Away Competitor</Label>
              <Select
                required
                value={editingMatch?.awayTeam || ""}
                onChange={(e) =>
                  setEditingMatch({ ...editingMatch, awayTeam: e.target.value })
                }
              >
                <option value="">Select Team</option>
                {mockTeams
                  .filter(
                    (t) =>
                      t.sport === editingMatch?.sport &&
                      t.name !== editingMatch?.homeTeam
                  )
                  .map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Scheduled Date & Time</Label>
              <Input
                type="datetime-local"
                required
                value={editingMatch?.startTime || ""}
                onChange={(e) =>
                  setEditingMatch({
                    ...editingMatch,
                    startTime: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Event Status</Label>
              <Input
                value={editingMatch?.status || ""}
                onChange={(e) =>
                  setEditingMatch({ ...editingMatch, status: e.target.value })
                }
                placeholder="Upcoming / Postponed"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="flex-1">
              Schedule Event
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default MatchManagement;
