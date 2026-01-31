import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeacherCardType } from "@/components/owner/teacherCard";

async function deleteTeacher(id: string) {
    const response = await fetch(`http://localhost:4000/teachers/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    return response.json();
}

export default function useDeleteTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteTeacher(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] })
        },
        onMutate: (id: string) => {
            queryClient.cancelQueries({ queryKey: ['teachers'] });
            const oldTeacherList = queryClient.getQueryData<Array<TeacherCardType>>(['teachers']);
            const newTeacherList = oldTeacherList?.filter((old: TeacherCardType) => old.id !== id);
            queryClient.setQueryData<Array<TeacherCardType>>(['teachers'], newTeacherList);
        }
    })
} 