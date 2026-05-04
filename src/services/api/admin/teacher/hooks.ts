import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { teacherFetcher } from './fetcher'
import type { TeacherWithUser, AddTeacherModel } from '@/lib/Types/TeacherTypes'
import { addTeacherSchema } from '@/lib/Schemas/TeacherSchemas'
import type { Filters } from '@/lib/Types/FilterTypes'

export function useAddTeacher() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: teacherFetcher.addTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onMutate: (teacher: TeacherWithUser) => {
      queryClient.cancelQueries({ queryKey: ['teachers'] })
      const oldTeachersList = queryClient.getQueryData<Array<TeacherWithUser>>([
        'teachers',
      ])
      const newTeachersList = oldTeachersList
        ? [...oldTeachersList, teacher]
        : [teacher]
      queryClient.setQueryData(['teachers'], newTeachersList)
    },
  })
}

export function useGetTeachers({
  pageIndex,
  search,
  pageSize,
}: Partial<Filters<TeacherWithUser>> = {}) {
  return useQuery({
    queryKey: ['teachers', pageIndex, search, pageSize],
    queryFn: () => teacherFetcher.getTeachers({ pageIndex, search, pageSize }),
    select: (response) => {
      return {
        data: response.success ? response.data : [],
        pagination: {
          totalPages: response.success ? response.pagination.totalPages : 1,
          totalElements: response.success
            ? response.pagination.totalElements
            : 0,
        },
      }
    },
    placeholderData: keepPreviousData,
  })
}

// export function useEditTeacher(EditedTeacher: TeacherWithUser) {
//   const onSubmit = (data: EditTeacherModel) => {
//     const newData = {
//       ...data,
//       id: EditedTeacher.id,
//       role: EditedTeacher.role,
//       password: EditedTeacher.password,
//     }
//     console.log(newData)
//     editTeacher(newData)
//   }

//   const teacherForm = useForm<EditTeacherModel>({
//     defaultValues: {
//       ...EditedTeacher,
//     },
//     resolver: zodResolver(EditTeacherSchema),
//   })

//   const queryClient = useQueryClient()

//   const { mutate: editTeacher } = useMutation({
//     mutationFn: teacherFetcher.editTeacher,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['teachers'] })
//     },
//     onMutate: () => {
//       queryClient.cancelQueries({ queryKey: ['teachers'] })
//       const oldTeacherList = queryClient.getQueryData<Array<TeacherModel>>([
//         'teachers',
//       ])
//       const newTeacherList = oldTeacherList?.map((t) => {
//         t.id === EditedTeacher.id ? EditedTeacher : t
//       })
//       queryClient.setQueryData(['teachers'], newTeacherList)
//     },
//   })
//   return { teacherForm, onSubmit }
// }

export function useDeleteTeacher(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => teacherFetcher.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['teachers'] })
      const oldTeachersList = queryClient.getQueryData<Array<TeacherWithUser>>([
        'teachers',
      ])
      const newTeachersList = oldTeachersList?.filter(
        (old: TeacherWithUser) => old.id !== id,
      )
      queryClient.setQueryData<Array<TeacherWithUser>>(
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

export function useEditTeacher(EditedTeacher: TeacherWithUser) {
  const queryClient = useQueryClient()

  const teacherForm = useForm<AddTeacherModel>({
    defaultValues: EditedTeacher as unknown as AddTeacherModel,
    resolver: zodResolver(addTeacherSchema as any),
  })

  const { mutate: editTeacher } = useMutation({
    mutationFn: teacherFetcher.editTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      queryClient.invalidateQueries({ queryKey: ['teacher', EditedTeacher.id] })
    },
  })

  const onSubmit = (data: AddTeacherModel) => {
    const payload = { ...EditedTeacher, ...data } as TeacherWithUser
    editTeacher(payload)
  }

  return { teacherForm, onSubmit }
}
