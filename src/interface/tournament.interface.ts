export enum TournamentType {
  LEAGUE = "league",
  TOURNAMENT = "tournament",
  CUP = "cup",
  INTERNATIONAL = "international",
  GRAND_SLAM = "grand-slam",
  OTHER = "other",
}

export interface ITournament {
  _id: string;
  key: string;
  name: string;
  apiLeagueName: string;
  slug: string;
  sport: any; // Can be ID or populated object
  type?: TournamentType;
  description?: string;
  startDate?: string;
  endDate?: string;
  year?: string;
  country?: string;
  logo?: string;
  banner?: string;
  poster?: string;
  trophy?: string;
  alternateName?: string;
  gender?: string;
  isFeatured: boolean;
  hitCount: number;
  lastAccessedAt: string | null;
  isActive: boolean;
  currentSeason: string | null;
  syncTier: 1 | 2 | 3;
  nextCheckAt: string;
  lastSyncedAt: string | null;
  consecutiveEmptyChecks: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITournamentPayload {
  key?: string;
  name: string;
  apiLeagueName?: string;
  slug: string;
  sport: string;
  type?: TournamentType;
  description?: string;
  startDate?: string;
  endDate?: string;
  prizePool?: number;
  currency?: string;
  year?: string;
  country?: string;
  logo?: string | File;
  isActive?: boolean;
}

export interface ITournamentResponse {
  _id: string;
  tournamentId: string;
  name: string;
  slug: string;
  sport: string;
  type: TournamentType;
  description?: string;
  startDate: string;
  endDate?: string;
  prizePool?: number;
  currency?: string;
  year?: string;
  country?: string;
  logo?: string;
  isActive: boolean;
}
