import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Collection } from './getCollection'


const API_URL = 'http://localhost:4000/collections'

const getAllCollections = async (all : boolean): Promise<Array<Collection>> => {
  const response = await axios.get<Array<Collection>>(API_URL )
  const data = response.data 
  return all ? data : data.slice(0, 3)
}
export const getAllCollectionsQueryOptions = (all : boolean) => ({
  queryKey: ['collections', all],
  queryFn: () => getAllCollections(all),
})

export default function useGetAllCollections(all: boolean) {
  return useQuery(getAllCollectionsQueryOptions(all))
}
