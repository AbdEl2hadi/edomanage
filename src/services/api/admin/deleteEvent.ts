import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

function deleteEvent(id: string) {
  return api
    .delete(`http://localhost:4000/events/${id}`)
    .then((res) => res.data)
}

export default function useDeleteEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
