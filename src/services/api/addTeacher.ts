import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeacherProfile } from "@/routes/owner/teachers.add";

async function addTeacher(teacher: TeacherProfile) {
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
        mutationFn: (teacher: TeacherProfile) => addTeacher(teacher), onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        }, onMutate: (teacher: TeacherProfile) => {
            queryClient.cancelQueries({ queryKey: ["teachers"] });
            const oldTeachersList = queryClient.getQueryData<Array<TeacherProfile>>(["teachers"]);
            const newTeachersList = oldTeachersList?.push(teacher);
            queryClient.setQueryData(["teachers"], newTeachersList);
        }
    });
}