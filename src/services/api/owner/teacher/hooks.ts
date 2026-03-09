import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teacherFetcher } from "./fetcher";
import type { TeacherModel } from "../types/modelTypes";

export function useAddTeacher(teacher: TeacherModel) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => teacherFetcher.addTeacher(teacher),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onMutate: () => {
            queryClient.cancelQueries({ queryKey: ["teachers"] });
            const oldTeachersList = queryClient.getQueryData<Array<TeacherModel>>(["teachers"]);
            const newTeachersList = oldTeachersList ? [...oldTeachersList, teacher] : [teacher]
            queryClient.setQueryData(["teachers"], newTeachersList);
        }
    });
}

export function useGetTeachers() {
    return useQuery({
        queryKey: ['teachers'], queryFn: teacherFetcher.getTeachers, select: (response) => {
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

export function useEditTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: teacherFetcher.editTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] })
        },
        onMutate: (modifiedTeacher) => {
            queryClient.cancelQueries({ queryKey: ["teachers"] });
            const oldTeacherList = queryClient.getQueryData<Array<TeacherModel>>(["teachers"]);
            const newTeacherList = oldTeacherList?.map((teacher) => { teacher.id === modifiedTeacher.id ? modifiedTeacher : teacher })
            queryClient.setQueryData(['teachers'], newTeacherList)
        }
    });
}

export function useDeleteTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => teacherFetcher.deleteTeacher(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] })
        },
        onMutate: (id: string) => {
            queryClient.cancelQueries({ queryKey: ['teachers'] });
            const oldTeachersList = queryClient.getQueryData<Array<TeacherModel>>(['teachers']);
            const newTeachersList = oldTeachersList?.filter((old: TeacherModel) => old.id !== id);
            queryClient.setQueryData<Array<TeacherModel>>(['teachers'], newTeachersList);
        }
    })
} 