import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeacherProfileType } from "@/components/owner/teacherCard";

async function editTeacher(modifiedTeacher: TeacherProfileType) {
    const response = await fetch(`http://localhost:4000/teachers/${modifiedTeacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifiedTeacher),
    });
    return response.json();
}

export default function useEditTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (modifiedTeacher: TeacherProfileType) => editTeacher(modifiedTeacher),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["teachers"] }) },
        onMutate: (modifiedTeacher) => {
            queryClient.cancelQueries({ queryKey: ["teachers"] });
            const oldTeacherList = queryClient.getQueryData<Array<TeacherProfileType>>(["teachers"]);
            const newTeacherList = oldTeacherList?.map((teacher) => { teacher.id === modifiedTeacher.id ? modifiedTeacher : teacher })
            queryClient.setQueryData(['teachers'], newTeacherList)
        }
    });
}