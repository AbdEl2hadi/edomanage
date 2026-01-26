import { create } from "zustand";
import type { StudentCardType } from "@/components/owner/studentCard";
import {useQuery} from "@tanstack/react-router"

const { data, isLoading, error } = useQuery({ querykey: ["students"], queryFn: fetchStudents });

const fetchStudents = async () => {
    try {
        const result = await fetch("http://localhost:4000/students");
        return result.json();
    }
    catch (error) {
        console.log("a problem happens when fetching data !");
    }
}

type StudentListMethods = {
    studentList: Array<StudentCardType>;
    addStudent: (student: StudentCardType) => void;
    deleteStudent: (name: string) => void;
    editStudent: (name: string, status: string, grade: string, email: string, number: string, parentPhoneNumber: string, parentName: string) => void;
}

export const useStudentList = create<StudentListMethods>((set) => ({
    studentList: retrieveStudentsList(),
    addStudent: (student: StudentCardType) => {
        set((state) => ({ studentList: [...state.studentList, student] }));
    },
    deleteStudent: (name: string) => {
        set((state) => ({ studentList: state.studentList.filter((student) => student.name !== name) }));
    },
    editStudent: (name: string, status: string, grade: string, email: string, number: string, parentPhoneNumber: string, parentName: string) => {
        set((state) => ({ studentList: (state.studentList.map((student) => student.name === name ? { ...student, name, status, subject, email, parentName, parentPhoneNumber, grade, number } : student)) }))
    }
}))