export interface Pagination {
    previousPage: number | null | string,
    current: number | string | null,
    nextPage: number | string | null,
    total: number | string | null,
    pageSize: number | string | null
}