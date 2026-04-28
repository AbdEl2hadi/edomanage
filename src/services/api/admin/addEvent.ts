import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { EventForm } from '@/components/admin/calendar/model'
import { api } from '@/lib/api'

function addEvent(event: EventForm) {
  return api
    .post('http://localhost:4000/events', event)
    .then((res) => res.data)
}

export default function useAddEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
