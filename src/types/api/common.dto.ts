interface ApiPageResponse<ApiData> {
    data: ApiData[];
    page: number;
    total: number;
    limit: number;
    totalPages: number;
}

export type {
    ApiPageResponse
}