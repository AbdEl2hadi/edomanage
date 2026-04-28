import type {
  Collection,
  Notification,
  Resource,
  ResourceApiModel,
} from './modelType'

export type SuccessResponse<T> = {
  success: true
  message: string
  data: T
}

export enum ErrorTypes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  HTTP_ERROR = 'HTTP_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

interface ErrorResponse {
  success: false,
}

type ValidationErrorResponse = ErrorResponse & {
  errorType: ErrorTypes.VALIDATION_ERROR,
  issues: Array<string>
}

type HTTPErrorResponse = ErrorResponse & {
  errorType: ErrorTypes.HTTP_ERROR,
  message: string
}

type InternalServerErrorResponse = ErrorResponse & {
  errorType: ErrorTypes.INTERNAL_SERVER_ERROR,
  message: string
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


export type PaginationParams = {
  page: number
  size: number
}

// export type Filter<T> = Partial<T & PaginationParams>
export type SortParams<T extends string = string> = { sortBy: T, sortOrder: "asc" | "desc" | null }
export type Filters<T> = Partial<T & PaginationParams & SortParams> & {
  search?: string
}



export type TypeTabFilter = 'All' | 'Urgent' | 'Administration'

export type ResourceFilter = Filters<Resource>

export type NotificationFilter = Filters<Notification>

export type AddOrEditCollectionPayload = {
  name: string
  role: 'add' | 'edit'
  id?: string
}

export interface CollectionFetcher {
  getCollection: (collectionId: string) => Promise<Collection>
  getAllCollections: (all: boolean) => Promise<Array<Collection>>
  getResources: (
    collectionId: string | undefined,
    filterAndPagination: ResourceFilter,
  ) => Promise<PaginatedSuccessResponse<Resource>>
  addOrEditCollection: (
    name: string,
    role: 'add' | 'edit',
    id?: string,
  ) => Promise<void>
  deleteCollection: (collectionId: string) => Promise<void>
}

export type AddTeacherNotificationPayload = {
  role: 'teacher' | 'admin'
  subject: string
  content: string
  attachments?: FileList | Array<File>
  onUploadProgress?: (progress: number) => void
  sendTo?: Array<string>
  type: 'Teacher' | 'Urgent' | 'Administrative' | 'User' | 'Grade' | 'Book'
}

export interface NotificationFetcher {
  getTeacherNotifications: (
    filterAndPagination: NotificationFilter,
  ) => Promise<PaginatedSuccessResponse<Notification>>
  getTeacherNotification: (notificationId: string) => Promise<Notification>
  addTeacherNotification: (
    payload: AddTeacherNotificationPayload,
  ) => Promise<Notification>
  deleteOwnNotification: (notificationId: string) => Promise<void>
}

export type { ResourceApiModel }
