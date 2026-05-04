import { filterResources } from './filter'
import type { Collection } from '@/lib/Types/CollectionTypes'
import type { ResourceFilter } from '@/lib/Types/FilterTypes'
import type { Resource, ResourceApiModel } from '@/lib/Types/ResourceTypes'
import type { PaginatedSuccessResponse } from '@/lib/Types/ApiTypes'

import { api } from '@/lib/api'

const API_URL = 'http://localhost:4000'

export interface ICollectionFetcher {
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



class CollectionFetcher implements ICollectionFetcher {
  async getCollection(collectionId: string): Promise<Collection> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await api.get<Collection>(
      `${API_URL}/collections/${collectionId}`,
    )
    return response.data
  }

  async getAllCollections(all: boolean): Promise<Array<Collection>> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await api.get<Array<Collection>>(`${API_URL}/collections`)
    const data = response.data
    return all ? data : data.slice(0, 3)
  }

  async getResources(
    collectionId: string | undefined,
    searchParams: ResourceFilter,
  ): Promise<PaginatedSuccessResponse<Resource>> { // maafa change this paginationData type with the paginatedStuccessResponse type since i can't find it anywhere 
    await new Promise((resolve) => setTimeout(resolve, 200))
    const response = await api.get<Array<ResourceApiModel>>(
      `${API_URL}/resources`,
    )
    return filterResources(response.data, collectionId, searchParams)
  }

  async addOrEditCollection(
    name: string,
    role: 'add' | 'edit',
    id?: string,
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const data: Collection = {
      id: id || crypto.randomUUID(),
      name,
      filesCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sizeMB: 0,
    }
    if (role === 'add') {
      await api.post('http://localhost:4000/collections', data)
    } else {
      const patch = { name, updatedAt: new Date().toISOString() }
      await api.patch(`http://localhost:4000/collections/${id}`, patch)
    }
  }

  async deleteCollection(collectionId: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await api.delete(`http://localhost:4000/collections/${collectionId}`)
  }
}

export const collectionFetcher: ICollectionFetcher = new CollectionFetcher()
