import { useQuery  } from '@tanstack/react-query'
import axios from 'axios'

import type { UseQueryResult } from '@tanstack/react-query';

export type Not =
  | Array<{
      id: number
      type: string
      title: string
      message: string
      time: string
    }>

const getNotification = async (): Promise<Not> => {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const data: Not = await axios
    .get<Not>('http://localhost:4000/notifications')
    .then((res) => {
      return res.data
    })
  return data
}

export default function useGetNotPanel() : UseQueryResult<Not> {
  return useQuery({
    queryKey: ['notifications', 'panel'],
    queryFn: getNotification,
    refetchInterval: 5000,
  })
}
