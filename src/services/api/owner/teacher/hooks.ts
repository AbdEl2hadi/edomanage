import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { teacherFetcher } from './fetcher'
import { EditTeacherSchema } from './Schemas'
import type { EditTeacherModel, TeacherModel } from './Schemas'

export function useAddTeacher() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: teacherFetcher.addTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onMutate: (teacher: TeacherModel) => {
      queryClient.cancelQueries({ queryKey: ['teachers'] })
      const oldTeachersList = queryClient.getQueryData<Array<TeacherModel>>([
        'teachers',
      ])
      const newTeachersList = oldTeachersList
        ? [...oldTeachersList, teacher]
        : [teacher]
      queryClient.setQueryData(['teachers'], newTeachersList)
    },
  })
}

// export function useGetTeachers() {
//     return useQuery()
// }

export function useEditTeacher(EditedTeacher: TeacherModel) {
  const onSubmit = (data: EditTeacherModel) => {
    const newData = {
      ...data,
      id: EditedTeacher.id,
      role: EditedTeacher.role,
      password: EditedTeacher.password,
    }
    console.log(newData)
    editTeacher(newData)
  }

  const teacherForm = useForm<EditTeacherModel>({
    defaultValues: {
      ...EditedTeacher,
    },
    resolver: zodResolver(EditTeacherSchema),
  })

  const queryClient = useQueryClient()

  const { mutate: editTeacher } = useMutation({
    mutationFn: teacherFetcher.editTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['teachers'] })
      const oldTeacherList = queryClient.getQueryData<Array<TeacherModel>>([
        'teachers',
      ])
      const newTeacherList = oldTeacherList?.map((t) => {
        t.id === EditedTeacher.id ? EditedTeacher : t
      })
      queryClient.setQueryData(['teachers'], newTeacherList)
    },
  })
  return { teacherForm, onSubmit }
}

export function useDeleteTeacher(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => teacherFetcher.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['teachers'] })
      const oldTeachersList = queryClient.getQueryData<Array<TeacherModel>>([
        'teachers',
      ])
      const newTeachersList = oldTeachersList?.filter(
        (old: TeacherModel) => old.id !== id,
      )
      queryClient.setQueryData<Array<TeacherModel>>(
        ['teachers'],
        newTeachersList,
      )
    },
  })
}

export const getTeacherQueryOptions = (teacherId: string) => ({
  queryKey: ['teacher', teacherId],
  queryFn: async () => {
    const response = await teacherFetcher.getTeacher(teacherId)
    return response.success ? response.data : null
  },
  placeholderData: keepPreviousData,
})

export function useGetTeacher(id: string) {
  return useQuery(getTeacherQueryOptions(id))
}
