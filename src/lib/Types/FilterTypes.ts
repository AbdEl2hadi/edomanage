import type { PaginationParams } from "./PaginationTypes"
import type { Resource } from "./ResourceTypes"
import type { SortParams } from "./SortTypes"
import type { Notification } from "./NotificationTypes"

// Maafa Types
export type Filters<T> = Partial<T & PaginationParams & SortParams> & {
    search?: string
}

export type TypeTabFilterT = 'All' | 'Urgent' | 'Administration'

export type ResourceFilter = Filters<Resource>

export type NotificationFilter = Filters<Notification>

// Benali Types

export type TypeTabFilterS =
    | 'All'
    | 'Unread'
    | 'Urgent'
    | 'Teachers'
    | 'Administration'

