import { Bet, BetType, Match, Sport, Team, Tournament } from "../types/schema";

// Helper to generate IDs
const generateId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

// Initial Seed Data
const initialSports: Sport[] = [
  {
    _id: "sport_1",
    sportId: "SPORT-001",
    name: "Football",
    slug: "football",
    icon: "⚽",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "sport_2",
    sportId: "SPORT-002",
    name: "Cricket",
    slug: "cricket",
    icon: "🏏",
    displayOrder: 2,
    isActive: true,
    createdAt: new Date(),
  },
];

const initialBetTypes: BetType[] = [
  {
    _id: "bt_1",
    betTypeId: "BET-TYPE-001",
    sport: "sport_1",
    name: "Match Winner",
    slug: "match_winner",
    outcomes: [
      { outcomeId: "home_win", label: "Home Win", displayOrder: 1 },
      { outcomeId: "draw", label: "Draw", displayOrder: 2 },
      { outcomeId: "away_win", label: "Away Win", displayOrder: 3 },
    ],
    isDefault: true,
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "bt_2",
    betTypeId: "BET-TYPE-002",
    sport: "sport_2",
    name: "Match Winner",
    slug: "match_winner",
    outcomes: [
      { outcomeId: "home_win", label: "Home Win", displayOrder: 1 },
      { outcomeId: "away_win", label: "Away Win", displayOrder: 2 },
    ],
    isDefault: true,
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
  },
];

const initialTournaments: Tournament[] = [
  {
    _id: "tour_1",
    tournamentId: "TOUR-001",
    name: "Premier League 2025/26",
    slug: "premier-league-2025-26",
    sport: "sport_1",
    type: "league",
    year: "2025",
    country: "GB",
    isFeatured: true,
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "tour_2",
    tournamentId: "TOUR-002",
    name: "IPL 2026",
    slug: "ipl-2026",
    sport: "sport_2",
    type: "league",
    year: "2026",
    country: "IN",
    isFeatured: true,
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
  },
];

const initialTeams: Team[] = [
  {
    _id: "team_1",
    teamId: "TEAM-001",
    name: "Manchester United",
    shortName: "MUN",
    slug: "man-utd",
    sport: "sport_1",
    country: "GB",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "team_2",
    teamId: "TEAM-002",
    name: "Liverpool",
    shortName: "LIV",
    slug: "liverpool",
    sport: "sport_1",
    country: "GB",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "team_3",
    teamId: "TEAM-003",
    name: "Mumbai Indians",
    shortName: "MI",
    slug: "mumbai-indians",
    sport: "sport_2",
    country: "IN",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "team_4",
    teamId: "TEAM-004",
    name: "Chennai Super Kings",
    shortName: "CSK",
    slug: "csk",
    sport: "sport_2",
    country: "IN",
    isActive: true,
    createdAt: new Date(),
  },
];

const initialMatches: Match[] = [
  {
    _id: "match_1",
    matchId: "MATCH-001",
    sport: "sport_1",
    tournament: "tour_1",
    homeTeam: "team_1",
    awayTeam: "team_2",
    scheduledStartTime: new Date(Date.now() + 86400000), // Tomorrow
    status: "scheduled",
    source: "manual",
    availableBetTypes: ["bt_1"],
    isResultVerified: false,
    totalBetsCount: 0,
    isFeatured: true,
    createdBy: "user_admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialBets: Bet[] = [];

// Generic Data Manager
class DataManager<T extends { _id: string }> {
  private key: string;
  private initialData: T[];

  constructor(key: string, initialData: T[]) {
    this.key = key;
    this.initialData = initialData;
  }

  getAll(): T[] {
    const stored = localStorage.getItem(this.key);
    if (!stored) {
      this.setAll(this.initialData);
      return this.initialData;
    }
    // Need to parse dates back from strings if JSON.parsed
    return JSON.parse(stored, (key, value) => {
      if (
        key.endsWith("At") ||
        key === "scheduledStartTime" ||
        key === "lastUpdated"
      ) {
        return value ? new Date(value) : value;
      }
      return value;
    });
  }

  getById(id: string): T | undefined {
    return this.getAll().find((item) => item._id === id);
  }

  setAll(data: T[]) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  add(item: Omit<T, "_id" | "createdAt">): T {
    const newItem = {
      ...item,
      _id: generateId("ID"),
      createdAt: new Date(),
    } as unknown as T;
    const all = this.getAll();
    this.setAll([newItem, ...all]);
    return newItem;
  }

  update(id: string, updates: Partial<T>): T | null {
    const all = this.getAll();
    const index = all.findIndex((item) => item._id === id);
    if (index === -1) return null;

    const updatedItem = { ...all[index], ...updates, updatedAt: new Date() };
    all[index] = updatedItem;
    this.setAll(all);
    return updatedItem;
  }

  delete(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter((item) => item._id !== id);
    if (filtered.length === all.length) return false;
    this.setAll(filtered);
    return true;
  }
}

export const sportService = new DataManager<Sport>(
  "easybet_sports",
  initialSports
);
export const betTypeService = new DataManager<BetType>(
  "easybet_bettypes",
  initialBetTypes
);
export const tournamentService = new DataManager<Tournament>(
  "easybet_tournaments",
  initialTournaments
);
export const teamService = new DataManager<Team>("easybet_teams", initialTeams);
export const matchService = new DataManager<Match>(
  "easybet_matches",
  initialMatches
);
export const betService = new DataManager<Bet>("easybet_bets", initialBets);
