import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeacherProfileType } from "@/components/owner/teacherCard";

async function addTeacher(teacher: TeacherProfileType) {
    const response = await fetch("http://localhost:4000/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
    });
    return response;
}

export default function useAddTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (teacher: TeacherProfileType) => addTeacher(teacher), onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        }, onMutate: (teacher: TeacherProfileType) => {
            queryClient.cancelQueries({ queryKey: ["teachers"] });
            const oldTeachersList = queryClient.getQueryData<Array<TeacherProfileType>>(["teachers"]);
            const newTeachersList = oldTeachersList?.push(teacher);
            queryClient.setQueryData(["teachers"], newTeachersList);
        }
    });
}