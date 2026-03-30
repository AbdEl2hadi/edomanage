import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { collectionFetcher } from './fetcher'
import type {
  AddOrEditCollectionPayload,
  ResourceFilter,
} from '../types/apiType'

export const getCollectionQueryOptions = (collectionId: string) =>
  queryOptions({
    queryKey: ['collection', collectionId],
    queryFn: () => collectionFetcher.getCollection(collectionId),
  })

export function useGetCollection(collectionId: string) {
  return useQuery(getCollectionQueryOptions(collectionId))
}

export const getAllCollectionsQueryOptions = (all: boolean) =>
  queryOptions({
    queryKey: ['collections', all],
    queryFn: () => collectionFetcher.getAllCollections(all),
  })

export function useGetAllCollections(all: boolean) {
  return useQuery(getAllCollectionsQueryOptions(all))
}

export const getResourcesQueryOptions = (
  collectionId: string | undefined,
  filterAndPagination: ResourceFilter,
) =>
  queryOptions({
    queryKey: ['resources', collectionId, filterAndPagination],
    queryFn: () =>
      collectionFetcher.getResources(collectionId, filterAndPagination),
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

export function useAddOrEditCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ name, role, id }: AddOrEditCollectionPayload) =>
      collectionFetcher.addOrEditCollection(name, role, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      queryClient.invalidateQueries({ queryKey: ['collection'] })
    },
  })
}

export function useDeleteCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (collectionId: string) =>
      collectionFetcher.deleteCollection(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      queryClient.invalidateQueries({ queryKey: ['collection'] })
    },
  })
}
