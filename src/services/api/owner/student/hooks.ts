import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentFetcher } from "./fetcher";
import type { StudentModel } from "../types/modelTypes";
import type { Filters } from "../types/apiTypes";


export function useAddStudent(student: StudentModel) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => studentFetcher.addStudent(student),
        onMutate: () => { queryClient.invalidateQueries({ queryKey: ['students'] }) },
        onSuccess: () => {
            queryClient.cancelQueries({ queryKey: ['students'] })
            const oldStudentsList = queryClient.getQueryData<Array<StudentModel>>(['students']);
            const newStudentsList = oldStudentsList?.push(student)
            queryClient.setQueryData(['students'], newStudentsList)
        }
    });
}
// export function useGetStudent(args: PaginationSchema) {

// }


export function useGetStudents({ pageIndex: page, search, pageSize: size }: Filters<StudentModel>) {
    return useQuery({
        queryKey: ['students', page, search, size],
        queryFn: () => studentFetcher.getStudents({ pageIndex: page, search, pageSize: size }),
        select: (response) => {
            return {
                data: response.success ? response.data : [],
                pagination: {
                    totalPages: response.success ? response.pagination.totalPages : 1,
                    totalElements: response.success ? response.pagination.totalElements : 0,
                }
            }

        },
        placeholderData: keepPreviousData
    })
}

export function useEditStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: studentFetcher.editStudent,
        onMutate: (modifiedStudent) => {
            queryClient.cancelQueries({ queryKey: ["students"] });
            const oldStudentList = queryClient.getQueryData<Array<StudentModel>>(["students"]);
            const newStudentList = oldStudentList?.map((student) => student.id === modifiedStudent.id ? modifiedStudent : student)
            queryClient.setQueryData(['students'], newStudentList)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] })
        }
    });
}


export function useDeleteStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => studentFetcher.deleteStudent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] })
        },
        onMutate: (id: string) => {
            queryClient.cancelQueries({ queryKey: ['students'] });
            const oldStudentsList = queryClient.getQueryData<Array<StudentModel>>(['students']);
            const newStudentsList = oldStudentsList?.filter((old: StudentModel) => old.id !== id);
            queryClient.setQueryData<Array<StudentModel>>(['students'], newStudentsList)
        }
    }
    )
}