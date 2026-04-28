import type { HTTPErrorResponse, InternalServerErrorResponse, ValidationErrorResponse } from "./ErrorTypes"

export type SuccessResponse<T> = {
    success: true
    message: string
    data: T
}


export type ApiResponse<T> = SuccessResponse<T> | ValidationErrorResponse | HTTPErrorResponse | InternalServerErrorResponse

export type PaginatedSuccessResponse<T> = SuccessResponse<Array<T>> & {
    pagination: {
        totalPages: number
        totalElements: number
    }
}

export type PaginatedApiResponse<T> =
    | PaginatedSuccessResponse<T>
    | ValidationErrorResponse | HTTPErrorResponse | InternalServerErrorResponse

