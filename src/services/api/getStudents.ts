import { useQuery } from "@tanstack/react-query"

async function getStudent() {
    try {
        const result = await fetch("http://localhost:4000/students");
        return result.json();
    } catch (error) {
        throw new Error("error fetching students data");
    }
}

export default function useGetStudent() {
    return useQuery({ queryKey: ['students'], queryFn: getStudent })
}