export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  Sub_ADMIN = "sub-admin",
  SUPER_ADMIN = "super-admin",
}

export interface IUser {
  _id: string;
  customerId: string;
  email: string;
  role: UserRole;
  fullName: string;
  nickname: string;
  profileImage: string;
  phoneNumber: string;
  country: string;
  countryFlag: string;
  isVerified: boolean;
  isBlocked: boolean;
  isActive: boolean;
  referralCode: string;
  referredBy?: any;
  referredUsers?: any[];
  referralEarnings: number;
  failedLoginAttempts: number;
  lockUntil: string | null;
  lastLoginAt: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUserPayload {
  fullName: string;
  email: string;
  country: string;
  password: string;
  phoneNumber: string;
  role?: UserRole;
  referralCode?: string;
}

export interface IUserFilters {
  searchTerms?: string;
  isActive?: boolean;
  role?: UserRole;
  date?: string;
}
