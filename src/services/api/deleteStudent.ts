import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { StudentCardType } from "@/components/owner/studentCard";

async function deleteStudent(id: string) {
    const response = await fetch(`http://localhost:4000/students/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    return response.json();
}

export default function useDeleteStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteStudent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] })
        },
        onMutate: (id: string) => {
            queryClient.cancelQueries({ queryKey: ['students'] });
            const oldStudentList = queryClient.getQueryData<Array<StudentCardType>>(['students']);
            const newStudentList = oldStudentList?.filter((old: StudentCardType) => old.id !== id);
            queryClient.setQueryData<Array<StudentCardType>>(['students'], newStudentList)
        }
    }
    )
}