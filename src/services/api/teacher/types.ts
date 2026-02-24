export type PaginationData<T> = {
  data: Array<T>
  rowCount: number
}

export type PaginationParams = {
  pageIndex: number
  pageSize: number
}

export type Filter<T> = Partial<T & PaginationParams>

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
