export type ObjectId = string;

export interface Sport {
  _id: ObjectId;
  sportId: string; // Unique, e.g., "SPORT-001"
  name: string; // Unique, e.g., "Football", "Cricket"
  slug: string; // Unique, lowercase
  icon: string; // URL or emoji
  displayOrder: number; // Default: 0
  isActive: boolean; // Default: true
  createdAt: Date;
}

export interface BetOutcome {
  outcomeId: string;
  label: string;
  displayOrder: number;
}

export interface BetType {
  _id: ObjectId;
  betTypeId: string; // Unique, e.g., "BET-TYPE-001"
  sport: ObjectId; // Reference to Sports._id
  name: string; // e.g., "Match Winner", "Total Runs"
  slug: string; // e.g., "match_winner", "total_runs"
  outcomes: BetOutcome[];
  isDefault: boolean; // Default: false, Match Winner = true
  displayOrder: number; // Default: 0
  isActive: boolean; // Default: true
  createdAt: Date;
}

export type TournamentType =
  | "league"
  | "tournament"
  | "cup"
  | "international"
  | "grand_slam";

export interface Tournament {
  _id: ObjectId;
  tournamentId: string; // Unique
  name: string; // e.g., "Liga FUTVE 2025-26"
  slug: string; // Unique
  sport: ObjectId; // Reference to Sports._id
  type: TournamentType;
  year?: string; // e.g., "2026", optional
  country?: string; // ISO code, optional
  logo?: string; // Optional
  isFeatured: boolean; // Default: false
  displayOrder: number; // Default: 0
  isActive: boolean; // Default: true
  createdAt: Date;
}

export interface Team {
  _id: ObjectId;
  teamId: string; // Unique
  name: string; // e.g., "Bangladesh Cricket Team"
  shortName: string; // e.g., "BAN"
  slug: string; // Unique
  sport: ObjectId; // Reference to Sports._id
  country: string; // ISO code
  logo?: string; // Optional
  isActive: boolean; // Default: true
  createdAt: Date;
}

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished"
  | "cancelled"
  | "postponed";
export type MatchSource = "manual" | "api";

export interface LiveStatus {
  homeScore: number;
  awayScore: number;
  minute?: number;
  period?: string; // "Second Half", "1st Innings", etc.
  lastUpdated: Date;
}

export interface MatchResultByBetType {
  betType: ObjectId; // Reference to BetTypes._id
  winningOutcome: string; // e.g., "home_win"
}

export interface FinalResult {
  homeScore: number;
  awayScore: number;
  winner: ObjectId | null; // Reference to Teams._id, null for draw
  isDraw: boolean;
  resultByBetType: MatchResultByBetType[];
}

export interface Match {
  _id: ObjectId;
  matchId: string; // Unique, e.g., "MATCH-123456"
  sport: ObjectId; // Reference to Sports._id
  tournament?: ObjectId; // Reference to Tournaments._id, Optional
  homeTeam: ObjectId; // Reference to Teams._id
  awayTeam: ObjectId; // Reference to Teams._id
  scheduledStartTime: Date;
  status: MatchStatus;
  source: MatchSource;
  apiMatchId?: string; // Optional, for API matches
  apiProvider?: string; // Optional, e.g., "odds-api", "sportsdata"
  availableBetTypes: ObjectId[]; // Reference to BetTypes._id
  venue?: string; // Optional, e.g., "Mirpur Stadium"
  city?: string; // Optional
  country?: string; // ISO code, optional
  liveStatus?: LiveStatus;
  finalResult?: FinalResult;
  isResultVerified: boolean; // Default: false
  resultSettledBy?: ObjectId; // Reference to Users._id, optional
  resultSettledAt?: Date; // Optional
  totalBetsCount: number; // Default: 0
  isFeatured: boolean; // Default: false
  createdBy: ObjectId; // Reference to Users._id
  createdAt: Date;
  updatedAt: Date;
}

export type BetStatus =
  | "open"
  | "matched"
  | "cancelled"
  | "settled"
  | "refunded";

export interface Bet {
  _id: ObjectId;
  betId: string; // Unique, e.g., "BET-123456"
  match: ObjectId; // Reference to Matches._id
  betType: ObjectId; // Reference to BetTypes._id
  creator: ObjectId; // Reference to Users._id
  selectedOutcome: string; // e.g., "home_win", "draw", "away_win"
  stakeAmount: number; // Min: 10, USD
  creatorOdds?: number; // Optional, calculated
  status: BetStatus;
  matchedWith?: ObjectId; // Reference to Bets._id, opposite bet
  opponent?: ObjectId; // Reference to Users._id, after matching
  matchedAt?: Date;
  oppositeOutcome?: string; // Auto-set when matched
  oppositeStakeAmount?: number; // Can be different
  totalPot?: number; // creator + opponent stakes
  winnerUser?: ObjectId; // Reference to Users._id
  winnerPayout?: number; // After commission
  loserUser?: ObjectId; // Reference to Users._id
  platformCommission?: number; // 10% for customer, 5% for referral
  commissionRate: number; // Default: 10
  settledAt?: Date;
  isReferralBet: boolean; // Default: false
  referralUser?: ObjectId; // Optional
  createdAt: Date;
  expiresAt?: Date; // Optional, for open bets
  updatedAt: Date;
}
