import { create } from "zustand"
import type { TeacherCardType } from "@/components/owner/teacherCard"


type TeacherListMethods = {
    teacherList: Array<TeacherCardType>
    addTeacher: (teacher: TeacherCardType) => void
    deleteTeacher: (name: string) => void
    editTeacher: (name: string, status: string, subject: string ,email:string, number:string) => void
}








export const useTeacherList = create<TeacherListMethods>((set) => ({
    teacherList: teachersList,
    addTeacher: (teacher: TeacherCardType) => {
        set((state) => ({ teacherList: [...state.teacherList, teacher] }))
    },
    deleteTeacher: (name: string) => {
        set((state) => ({ teacherList: (state.teacherList.filter((teacher) => teacher.name !== name)) }))
    },
    editTeacher: (name: string, status: string, subject: string ,email:string, number:string) => {
        set((state) => ({ teacherList: (state.teacherList.map((teacher) => teacher.name === name ? { ...teacher, name, status, subject,email,number } : teacher)) }))
    }
}))

