import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { resourcesMock } from './data'
import type { PaginationData, Resource, ResourceFilter } from './types'






const parseDateAdded = (dateValue: string): number => {
  const timestamp = Date.parse(dateValue)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const parseSizeToBytes = (sizeValue: string): number => {
  const [amount, unit = 'B'] = sizeValue.trim().split(/\s+/)
  const normalizedAmount = Number(amount)

  if (Number.isNaN(normalizedAmount)) {
    return 0
  }

  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
  }

  const multiplier = multipliers[unit.toUpperCase()] ?? 1
  return normalizedAmount * multiplier
}

const getResources = async (
  collectionId: string | undefined,
  filterAndPagination: ResourceFilter,
): Promise<PaginationData<Resource>> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const {
    pageIndex = 1,
    pageSize = 5,
    sortBy = 'newest',
    ...filters
  } = filterAndPagination

  const normalizedFilters = Object.entries(filters).reduce<
    Partial<Record<keyof Resource, string>>
  >((acc, [key, value]) => {
    if (!value) {
      return acc
    }

    acc[key as keyof Resource] = String(value).toLowerCase()
    return acc
  }, {})

  const filtered = resourcesMock
    .filter((resource) => {
      if (collectionId === undefined) {
        return true
      }

      return resource.collectionId === collectionId
    })
    .filter((resource) => {
      return Object.entries(normalizedFilters).every(([key, value]) => {
        const currentValue = String(
          resource[key as keyof Resource],
        ).toLowerCase()
        return currentValue.includes(value)
      })
    })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'oldest') {
      return parseDateAdded(a.dateAdded) - parseDateAdded(b.dateAdded)
    }

    if (sortBy === 'name') {
      return a.fileName.localeCompare(b.fileName)
    }

    if (sortBy === 'size') {
      return parseSizeToBytes(b.size) - parseSizeToBytes(a.size)
    }

    return parseDateAdded(b.dateAdded) - parseDateAdded(a.dateAdded)
  })

  const start = (pageIndex - 1) * pageSize
  const end = start + pageSize

  return {
    data: sorted
      .slice(start, end)
      .map(({ collectionId: _collectionId, ...resource }) => resource),
    rowCount: sorted.length,
  }
}




/* api */ 
export const getResourcesQueryOptions = (
  collectionId: string | undefined,
  filterAndPagination: ResourceFilter,
) =>
  queryOptions({
    queryKey: ['resources', collectionId, filterAndPagination],
    queryFn: () => getResources(collectionId, filterAndPagination),
  })

export default function useGetResources(
  collectionId: string | undefined,
  filterAndPagination: ResourceFilter,
) {
  return useQuery({
    ...getResourcesQueryOptions(collectionId, filterAndPagination),
    placeholderData: keepPreviousData,
  })
}
