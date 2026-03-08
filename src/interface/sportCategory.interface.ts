export interface ISportCategory {
  _id: string;
  key?: string;
  name: string;
  slug: string;
  icon?: string;
  thumbnail?: string;
  description?: string;
  format?: string;
  apiSportName?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISportCategoryPayload {
  name: string;
  slug: string;
  key: string;
  icon?: string | File;
  apiSportName?: string;
}

export interface ISportCategoryResponse {
  _id: string;
  sportCategoryId: string;
  name: string;
  slug: string;
  icon: string;
}
