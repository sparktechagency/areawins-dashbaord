export enum MatchStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  FINISHED = "finished",
  CANCELLED = "cancelled",
  POSTPONED = "postponed",
}

export enum MatchSource {
  MANUAL = "manual",
  API = "api",
}

export interface ILiveStatus {
  homeScore: number;
  awayScore: number;
  minute?: number;
  period?: string;
  lastUpdated: string;
  additionalInfo?: {
    [key: string]: any;
  };
}

export interface IResultByBetType {
  betType: string;
  winningOutcome: string;
  odds?: number;
}

export interface IFinalResult {
  homeScore: number;
  awayScore: number;
  winner?: string;
  isDraw: boolean;
  resultByBetType: IResultByBetType[];
  matchDuration?: number;
  extraTime?: {
    homeScore: number;
    awayScore: number;
  };
  penalties?: {
    homeScore: number;
    awayScore: number;
    winner?: string;
  };
}

export interface IMatch {
  _id: string;
  matchId: string;
  apiMatchId?: string;
  apiProvider?: string;
  sport: any;
  tournament?: any;
  season?: string;
  homeTeam: any;
  awayTeam: any;
  scheduledStartTime: string;
  status: MatchStatus;
  strTimestamp?: string;
  dateEventLocal?: string;
  strTimeLocal?: string;
  strPostponed?: string;
  source: MatchSource;
  apiStatus?: string;
  apiStatusLabel?: string;
  venue?: string;
  city?: string;
  country?: string;
  round?: string;
  weather?: {
    temperature?: number;
    condition?: string;
    humidity?: number;
  };
  liveStatus?: ILiveStatus;
  finalResult?: IFinalResult;
  homeScore?: number;
  awayScore?: number;
  isResultVerified: boolean;
  resultSettledBy?: any;
  resultSettledAt?: string;
  availableBetTypes: string[];
  totalBetsCount: number;
  totalBetsAmount?: number;
  isFeatured: boolean;
  isLive: boolean;
  priority?: number;
  externalUpdatedAt?: string | null;
  isBettingOpen: boolean;
  bettingClosedAt?: string | null;
  syncError?: string | null;
  syncAttempts: number;
  isDeleted: boolean;
  createdBy: any;
  createdAt: string;
  updatedAt: string;
}

export interface IMatchPayload {
  matchId?: string;
  apiMatchId?: string;
  apiProvider?: string;
  tournament: string;
  sport: string;
  season?: string;
  homeTeam: string;
  awayTeam: string;
  scheduledStartTime: Date | string;
  status?: MatchStatus;
  venue?: string;
  strTimestamp?: string;
  dateEventLocal?: string;
  strTimeLocal?: string;
  strPostponed?: string;
  round?: string;
  apiStatus?: string;
  apiStatusLabel?: string;
  homeScore?: number;
  awayScore?: number;
  isLive?: boolean;
  liveStatus?: {
    homeScore: number;
    awayScore: number;
    minute?: number;
    lastUpdated: Date | string;
  };
  availableBetTypes?: string[];
  totalBetsCount?: number;
  isResultVerified?: boolean;
  isFeatured?: boolean;
  createdBy?: string;
  externalUpdatedAt?: string | null;
}

export interface IMatchResponse {
  _id: string;
  matchId: string;
  sport: string;
  tournament?: string;
  season?: string;
  homeTeam: string;
  awayTeam: string;
  scheduledStartTime: string;
  status: MatchStatus;
  source: MatchSource;
  availableBetTypes: string[];
  venue?: string;
  city?: string;
  country?: string;
  round?: string;
  homeScore?: number;
  awayScore?: number;
  liveStatus?: ILiveStatus;
  finalResult?: IFinalResult;
  isResultVerified: boolean;
  isLive: boolean;
  totalBetsCount: number;
  isFeatured: boolean;
  priority?: number;
}
