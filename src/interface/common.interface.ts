export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalResult: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    results: T[];
    pagination: IPagination;
  };
}

export interface ICommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
