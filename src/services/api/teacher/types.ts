
export type PaginationData<T> = {
  data: Array<T>
  rowCount: number
}

export type PaginationParams = {
  pageIndex: number
  pageSize: number
}

export type Filter<T> = Partial<T & PaginationParams>




/* Recources Filter*/ 

export type Resource = {
  id: number
  fileName: string
  type: string
  dateAdded: string
  size: string
}

export type ResourceSortOption = 'newest' | 'oldest' | 'name' | 'size'

export type ResourceFilter = Filter<Resource> & {
  sortBy?: ResourceSortOption
}

/* Notifications filter*/

export type NotificationAttachment = {
  href: string
  label: string
  extension: string
  kind: 'image' | 'video' | 'document'
}

export type Notification= {
  id: string
  type: 'Urgent' | 'Teacher' | 'Administrative' | 'User' | 'Grade' | 'Book'
  title: string
  content?: string 
  subject: string
  sendTo?: Array<"Students" | "Teachers" >
  attachments?: Array<NotificationAttachment>
  time: string
}

export type NotificationFilter = Filter<Notification> 




