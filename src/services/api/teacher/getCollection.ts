
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'




export type Collection = {
  id: string
  name: string
	filesCount: number
  createdAt: string
  updatedAt: string
  sizeMB: number
}

const API_URL = 'http://localhost:4000/collections'

const getResource = async (collectionId: string): Promise<Collection> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)) 
  const response = await axios.get<Collection>(`${API_URL}/${collectionId}`)
  return response.data
}
export const getCollectionQueryOptions = (collectionId: string) => ({
  queryKey: ['collection', collectionId],
  queryFn: () => getResource(collectionId),
})

export default function useGetCollection (collectionId: string) {
	return useQuery({
    queryKey: ['collection', collectionId],
    queryFn: () => getResource(collectionId),
  })
}
