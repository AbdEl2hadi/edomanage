import { useQuery } from "@tanstack/react-query"

async function getTeacher() {
    try {
        const result = await fetch("http://localhost:4000/teachers");
        return result.json();
    } catch (error) {
        throw new Error("error fetching teachers data");
    }
}

export default function useGetTeacher() {
    return useQuery({ queryKey: ['teachers'], queryFn: getTeacher })
}