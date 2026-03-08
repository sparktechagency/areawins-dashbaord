export interface IOutcome {
  outcomeId: string;
  label: string;
  description?: string;
  odds?: number;
}

export interface IBetType {
  _id: string;
  sport: any;
  name: string;
  slug: string;
  description?: string;
  outcomes: IOutcome[];
  isDefault: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBetTypePayload {
  sport: string;
  name: string;
  slug?: string;
  description?: string;
  outcomes: IOutcome[];
  isDefault?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

export interface IBetTypeResponse {
  _id: string;
  betTypeId: string;
  sport: string;
  name: string;
  slug: string;
  description?: string;
  outcomes: IOutcome[];
  isDefault: boolean;
  displayOrder: number;
  isActive: boolean;
}
