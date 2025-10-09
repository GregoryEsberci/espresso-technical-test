export type ApiMetadataType = {
  count: number;
  page: number;
  limit: number;
  pages: number;
  last: number;
  prev: number | null;
  next: number;
};

export type ApiResponse<T> = {
  data: T;
  metadata: ApiMetadataType;
};
