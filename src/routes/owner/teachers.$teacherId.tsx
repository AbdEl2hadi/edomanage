import { createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/owner/teachers/$teacherId')({
  component: RouteComponent,
})

function RouteComponent() {
  // const { form, onSubmit } = useEditTeacher(teacher)
}
