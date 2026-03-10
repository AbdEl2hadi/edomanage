export type SuccessResponse<T> = {
    success: true
    message: string
    data: T
}

export type ErrorResponse = {
    success: false
    message: string
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export type PaginatedSuccessResponse<T> = SuccessResponse<Array<T>> & {
    pagination: {
        totalPages: number
        totalElements: number
    }
}

export type PaginatedApiResponse<T> = PaginatedSuccessResponse<T> | ErrorResponse