export interface ApiResponse<T> {
  data: T;
}

export interface ApiResponseWithPages<T> {
  paging: {
    page: number;
    pages: number;
    items: number;
  };
  data: T[];
}
