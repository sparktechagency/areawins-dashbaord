
// Define RootState interface
export interface RootState {
  auth: {
    token: string | null;
    user: any;
  };
  dashboard: {
    isSidebarOpen: boolean;
    user: { name: string; role: string } | null;
    notifications: number;
  };
  talenzyApi: any; // This corresponds to the reducerPath in baseApi
}

export interface Bet {
  id: string;
  user: string;
  sport: string;
  event: string;
  stake: number;
  status: 'WON' | 'LOST' | 'PENDING' | 'SETTLED' | 'OPEN' | 'MATCHED' | 'CANCELLED';
  type: 'BACK' | 'LAY';
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'BLOCKED' | 'PENDING';
  balance: number;
  avatar: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  score: string;
  league: string;
  status: string;
  isLive: boolean;
  pot: number;
  sport: string;
  startTime?: string;
}

export interface Team {
  id: string;
  name: string;
  sport: string;
  country: string;
  logo: string;
  founded?: string;
  stadium?: string;
}

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  region: string;
  logo: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'UPCOMING';
  season: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  imageUrl?: string;
  matchCount: number;
  isActive: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'user' | 'bet' | 'financial';
  timestamp: string;
  isRead: boolean;
}
