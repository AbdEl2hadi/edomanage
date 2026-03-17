import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AddStudentSchema, EditStudentSchema } from '../student/Schemas'
import { studentFetcher } from './fetcher'
import type { AddStudentModel, StudentModel } from '../student/Schemas';
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

// get student by id 
export function useGetStudent(id: string) {
  return useQuery<StudentModel | null>({
    queryKey: ['student', id],
    queryFn: async () => {
      const response = await studentFetcher.getStudent(id);
      return response.success ? response.data : null;
    },
    // select: (response) => {
    // },
    // keepPreviousData: true,
  });
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
  const onSubmit = (data: StudentModel) => {
    editStudent(data)
  }

  const studentForm = useForm({
    defaultValues: {
      name: editedStudent.name,
      email: editedStudent.email,
      grade: editedStudent.grade,
      parentName: editedStudent.parentName,
      parentPhoneNumber: editedStudent.parentPhoneNumber,
      status: editedStudent.status,
      gender: editedStudent.gender,
      address: editedStudent.address,
      dateOfBirth: editedStudent.dateOfBirth,
      enrollmentDate: editedStudent.enrollmentDate,
      imgSrc: editedStudent.imgSrc,
    },
    resolver: zodResolver(EditStudentSchema),
  })
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
