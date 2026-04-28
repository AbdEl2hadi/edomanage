import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { EventForm } from '@/components/admin/calendar/model'
import { api } from '@/lib/api'

function editEvent(event: EventForm) {
  return api
    .patch(`http://localhost:4000/events/${event.id}`, event)
    .then((res) => res.data)
}

export default function useEditEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
