import { create } from "zustand";
import type { StudentCardType } from "@/components/owner/studentCard";

type StudentListMethods = {
    studentList: Array<StudentCardType>;
    addStudent: (student: StudentCardType) => void;
    deleteStudent: (name: string) => void;
}

const studentsList: Array<StudentCardType> = [
    {
        imgSrc:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD8MYDq3E037e4BHgu0T1ROOWTPs3WRapbSCJgBETDKXgHGt2bRqhA28IDNpWHK2NG6EeF28-yg-EJ1hthpzOtu5C7ZibH069qDTaSS3DkENTN1RzAdHOisn0c60b_bHCZ2W2yWVikMvgfOIdCBFgVrFjEbvJ4OekUd7Cz3LM09A0hOtyZNw0Mrl5-_1vESGk4_rZDAZ8NvAL1H_D-NaXttfiwXrDwk8m79eV2PKGXG_S-kQ0ewU_7yzl_iXzUF_XgqcNJIYtwqs_PT',
        gender: 'male',
        name: 'James Anderson',
        email: 'james.a@student.edu',
        id: '#ST-2024-001',
        grade: 'Grade 11 - A',
        parent: {
            name: 'Sarah Anderson',
            phoneNumber: '+1 (555) 123-4567',
        },
        status: 'Active',
    },
    {
        imgSrc:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBohAD1HcNUu1rOzCCUNdxiJbeNHzGUHT2uaEm4ec8RSk3Zmeq6pGET5P49TpSIpakvQxLDuNX5O9YnXklVnmsm6qlz15dGH5DWI-o1yroi8IrgwGcUP6ImKqo5iXII28cjt-qqr74948QV7gf8MvTjNCEr89ApKHFHT1qNkfM2KidzJ7kocSSOXFLBu6gGW9j76vOXtcTPD_-p9pNjufyfn7f2EsrmVRrkxbDszY_sbU9uITRLSZ06sVhobN2TXPjpuIC7XAKuwoEb',
        gender: 'female',
        name: 'Emily Chen',
        email: 'e.chen@student.edu',
        id: '#ST-2024-045',
        grade: 'Grade 10 - B',
        parent: {
            name: 'David Chen',
            phoneNumber: '+1 (555) 987-6543',
        },
        status: 'Active',
    },
    {
        imgSrc: '', // no image, initials used
        gender: 'male',
        name: 'Michael Ross',
        email: 'mike.ross@student.edu',
        id: '#ST-2023-112',
        grade: 'Grade 12 - A',
        parent: {
            name: 'Rachel Ross',
            phoneNumber: '+1 (555) 444-2222',
        },
        status: 'Inactive',
    },
    {
        imgSrc:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDUxvYm5zr_xNAj89vLbuPPqe0ynjaWRtk8DEYiocbs_HvvnV_c_rrK_Ylk6Q2nJYKJRIFNXsEmLlm5BFFaNNwo8AlPB2SlhjSqLyfiy-SULwxAB4zZsCA3JcyCa-k4DFBSMufluEOLjgaWEVJncDXusn1uVPCssSZlSfTcQQKUfBkGd83fI1GUrYD1ggcVoWvfAx15H5T2TFZKnT6d_0UGuYzVg4dO6m-Rd0CKcX56lGpr6CC2d9fw0jkmSc4w06sZEJ8-5lLeRHby',
        gender: 'female',
        name: 'Sophia Martinez',
        email: 'sophia.m@student.edu',
        id: '#ST-2024-089',
        grade: 'Grade 9 - C',
        parent: {
            name: 'Carlos Martinez',
            phoneNumber: '+1 (555) 777-8888',
        },
        status: 'Pending',
    },
    {
        imgSrc: '',
        gender: 'male',
        name: 'khatir ayoub',
        email: 'khatir.a@student.edu',
        id: '#esi-2024-089',
        grade: 'Grade 2 - A',
        parent: {
            name: 'mohamed khatir ',
            phoneNumber: '+1 026 777-8888',
        },
        status: 'hello world',
    },
]



export const useStudentList = create<StudentListMethods>((set) => ({
    studentList: studentsList,
    addStudent: (student: StudentCardType) => {
        set((state) => ({ studentList: [...state.studentList, student] }));
    },
    deleteStudent: (name: string) => {
        set((state) => ({ studentList: state.studentList.filter((student) => student.name !== name) }));
    },
})) 