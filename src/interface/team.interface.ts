export interface ITeam {
  _id: string;
  key: string;
  name: string;
  slug: string;
  shortName: string;
  logo?: string;
  badge?: string;
  alternateName?: string;
  gender?: string;
  icon?: string;
  sport: any;
  tournament?: any;
  country?: string;
  foundedYear?: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamPayload {
  key?: string;
  name: string;
  slug: string;
  shortName: string;
  logo?: string | File;
  badge?: string;
  alternateName?: string;
  gender?: string;
  sport: string;
  tournament?: string;
  country?: string;
  foundedYear?: number;
}

export interface ITeamResponse {
  _id: string;
  teamId: string;
  name: string;
  slug: string;
  shortName: string;
  logo?: string;
  sport: string;
  country?: string;
  foundedYear?: number;
}
