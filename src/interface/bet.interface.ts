export enum BetStatus {
  OPEN = "open",
  MATCHED = "matched",
  CANCELLED = "cancelled",
  SETTLED = "settled",
  REFUNDED = "refunded",
}

export interface IBet {
  _id: string;
  betId: string;
  match: any;
  betType: any;
  creator: any;
  selectedOutcome: string;
  stakeAmount: number;
  creatorOdds?: number;
  status: BetStatus;
  matchedWith?: any;
  opponent?: any;
  matchedAt?: string;
  oppositeOutcome?: string;
  oppositeStakeAmount?: number;
  totalPot?: number;
  winnerUser?: any;
  winnerPayout?: number;
  loserUser?: any;
  platformCommission?: number;
  commissionRate: number;
  isReferralBet: boolean;
  referralUser?: any;
  settledAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBetPayload {
  match: string;
  betType: string;
  selectedOutcome: string;
  stakeAmount: number;
  creatorOdds?: number;
  expiresAt?: string;
  commissionRate?: number;
  isReferralBet?: boolean;
  referralUser?: string;
}

export interface IBetResponse {
  _id: string;
  betId: string;
  match: string;
  betType: string;
  creator: string;
  selectedOutcome: string;
  stakeAmount: number;
  creatorOdds?: number;
  status: BetStatus;
  matchedWith?: string;
  opponent?: string;
  matchedAt?: string;
  oppositeOutcome?: string;
  oppositeStakeAmount?: number;
  totalPot?: number;
  winnerUser?: string;
  winnerPayout?: number;
  loserUser?: string;
  platformCommission?: number;
  commissionRate: number;
  isReferralBet: boolean;
  referralUser?: string;
  settledAt?: string;
  expiresAt?: string;
}
