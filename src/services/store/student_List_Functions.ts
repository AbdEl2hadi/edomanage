import { create } from "zustand";
import type { StudentInfo } from "@/components/owner/studentCard";
import { studentsList } from "@/components/owner/studentList";

type StudentListMethods = {
    studentList: Array<StudentInfo>;
    addS: (student: StudentInfo) => void;
    deleteS: (name: string) => void;
}


export const useStudentList = create<StudentListMethods>((set) => ({
    studentList: studentsList,
    addS: (student: StudentInfo) => {
        set((state) => ({ studentList: [...state.studentList, student] }));
    },
    deleteS: (name: string) => {
        set((state) => ({ studentList: state.studentList.filter((student) => student.name !== name) }));
    },
})) 