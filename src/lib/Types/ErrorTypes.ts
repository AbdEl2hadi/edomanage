export enum ErrorTypes {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    HTTP_ERROR = 'HTTP_ERROR',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

interface ErrorResponse {
    success: false,
}

export type ValidationErrorResponse = ErrorResponse & {
    errorType: ErrorTypes.VALIDATION_ERROR,
    issues: Array<string>
}

export type HTTPErrorResponse = ErrorResponse & {
    errorType: ErrorTypes.HTTP_ERROR,
    message: string
}

export type InternalServerErrorResponse = ErrorResponse & {
    errorType: ErrorTypes.INTERNAL_SERVER_ERROR,
    message: string
}
