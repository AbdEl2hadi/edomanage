import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { studentFetcher } from './fetcher'
import { AddStudentSchema, EditStudentSchema } from './schemas';
import type { AddStudentModel, EditStudentModel, StudentModel } from './schemas';
import type { Filters } from '../types/apiTypes'

// add student
export function useAddStudent() {

  const queryClient = useQueryClient()
  const { mutate: addStudent } = useMutation({
    mutationFn: studentFetcher.addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onMutate: (student) => {
      queryClient.cancelQueries({ queryKey: ['students'] })
      const oldStudentsList = queryClient.getQueryData<Array<StudentModel>>([
        'students',
      ])
      const newStudentsList = [...(oldStudentsList ?? []), student]
      queryClient.setQueryData(['students'], newStudentsList)
    },
  })

  const studentForm = useForm<AddStudentModel>({
    resolver: zodResolver(AddStudentSchema),
  })

  function onSubmit(data: AddStudentModel) {
    const newData = {
      ...data,
      id: crypto.randomUUID(),
      status: "active"
    }
    console.log(newData)
    addStudent(newData)
  }
  return { studentForm, onSubmit }
}

export const getStudentQueryOptions = (studentId: string) => ({
  queryKey: ['student', studentId],
  queryFn: async () => {
    const response = await studentFetcher.getStudent(studentId);
    return response.success ? response.data : null;
  },
})

// get student by id 
export function useGetStudent(id: string) {
  return useQuery<StudentModel | null>(getStudentQueryOptions(id));
}



// get student list 
export function useGetStudents({
  pageIndex: page,
  search,
  pageSize: size,
}: Partial<Filters<StudentModel>>) {
  return useQuery({
    queryKey: ['students', page, search, size],
    queryFn: () =>
      studentFetcher.getStudents({ pageIndex: page, search, pageSize: size }),
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



// edit student information
export function useEditStudent(editedStudent: StudentModel) {
  const queryClient = useQueryClient();
  const { mutate: editStudent } = useMutation({
    mutationFn: studentFetcher.editStudent,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["students"] });
      const oldStudentList = queryClient.getQueryData<Array<StudentModel>>(["students"]);
      const newStudentList = oldStudentList?.map((student) => student.id === editedStudent.id ? { ...student, ...editedStudent } : student)
      queryClient.setQueryData(['students'], newStudentList)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
    }
  });


  function onSubmit(data: EditStudentModel) {
    const newData = {
      name: data.name,
      email: data.email,
      grade: data.grade,
      classe: data.classe,
      parentPhoneNumber: data.parentPhoneNumber,
      parentName: data.parentName,
      gender: data.gender,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      enrollmentDate: data.enrollmentDate,
      imgSrc: "image/jpeg;base64,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",
      status: editedStudent.status,
      id: editedStudent.id
    }
    console.log(newData)
    editStudent(newData)
  }

  const studentForm = useForm<EditStudentModel>({
    defaultValues: { ...editedStudent },
    resolver: zodResolver(EditStudentSchema),
  })

  return { studentForm, onSubmit }
}



// delete student
export function useDeleteStudent(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => studentFetcher.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['students'] })
      const oldStudentsList = queryClient.getQueryData<Array<StudentModel>>([
        'students',
      ])
      const newStudentsList = oldStudentsList?.filter(
        (old: StudentModel) => old.id !== id,
      )
      queryClient.setQueryData<Array<StudentModel>>(
        ['students'],
        newStudentsList,
      )
    },
  })
}
