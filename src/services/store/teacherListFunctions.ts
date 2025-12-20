import type { TeacherCardType } from "@/components/owner/teacherCard"
import { create } from "zustand"


type TeacherListMethods = {
    teacherList: Array<TeacherCardType>
    addTeacher: (teacher: TeacherCardType) => void
    deleteTeacher: (name: string) => void
    editTeacher: (name: string, status: string, subject: string) => void
}

export const teachersList: TeacherCardType[] = [
    {
        id: 'T-1024',
        imgSrc:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBhlIOBVVsnV_uapAsHlZs-uEgRI3Psz6ygRfODlQJUO7UvdC7Y6ZUTuN_HIMfKvz6VuQVfq4cNWXr6qOzFQugIRo4Xdu3BC7dmyPMPNUFj2kkC140TiPB59Qy3IBaL18zFT9nJVHzxv_hhpqGB1z-5PGarR_Rw1oFsGU18rGw_qmcCV0VA0qx5xX3ELAMbZmpmm5FSlKWIyzEAWx0s2vzRAnfAIsW5koYVQ0B33N6qVhNzQhgqLQPMV2kct8DH5tP8Kag7GpGg6OaH',
        name: 'Sarah Jenkins',
        subject: 'Mathematics',
        gender: "female",
        teachAt: 'High School',
        email: 'sarah.j@school.edu',
        number: '+1 (555) 123-4567',
        status: 'Active',
    },
    {
        id: 'T-1045',
        imgSrc: '',
        name: 'Michael Ross',
        gender: "male",
        subject: 'Physics',
        teachAt: 'Senior Department',
        email: 'm.ross@school.edu',
        number: '+1 (555) 987-6543',
        status: 'Active',
    },
    {
        id: 'T-1088',
        imgSrc:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCEAi7Yhn48HHbCi9YDQ5-I37uRyKbIIWzroJrSsB0fejFn41f3hLNJW8Oh5Co99RRfahvly6Ira_L38nVxN6igr9xn7RFIxRFqyEttFdOOC45OMz-lK2acfxYaIOVtYAUrZdT8tqHC88-5ZK8UPJBWU26_tRn6QaAIItzUNdw1_YsE2R2VHTNZrwcd0MryKQfW9IrJXM-RA9nCoekelzR6HrhR5EKvgOS3U45kcFDpYu91SPrfxVXA64c9gIQM71NP8b3-nWQRdQ9K',
        name: 'James Wilson',
        subject: 'History',
        gender: "male",
        teachAt: 'Middle School',
        email: 'james.w@school.edu',
        number: '+1 (555) 333-2211',
        status: 'On Leave',
    },
    {
        id: 'T-1102',
        imgSrc:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAmuZExrNKCjOKCWvgt7uHLFmjYmAh1Q3qyhwdSQ9ID2i6cVCVT5SVLKCR7EHcV4Dgy6jDv8vouiq88wnGoOuXKgIL5ISxE-rYbyPdKAWUHvaIUe0zhV8O2mdnrvD7QKxnfKMHxoQeBCN4s9qjQ8NxMrOU8Z1N0j7AN7xTWN8V0Yekw-wUgWHuWu3-ABWJKOjhxRhibjNfiOuuqmIETvkF7Y7Vg3UbYuizR8QoOUIPghroYEEb6D4WKuc_2OwCVMsFoF3yWE-1WfVEV',
        name: 'Anita Patel',
        subject: 'Chemistry',
        gender: "female",
        teachAt: 'Lab Department',
        email: 'anita.p@school.edu',
        number: '+1 (555) 777-8899',
        status: 'Active',
    },
    {
        id: 'T-1120',
        imgSrc: '',
        name: 'David Kim',
        subject: 'Physical Education',
        gender: "male",
        teachAt: 'Sports Dept',
        email: 'david.k@school.edu',
        number: '+1 (555) 444-5555',
        status: 'New',
    },
]







export const useTeacherList = create<TeacherListMethods>((set) => ({
    teacherList: teachersList,
    addTeacher: (teacher: TeacherCardType) => {
        set((state) => ({ teacherList: [...state.teacherList, teacher] }))
    },
    deleteTeacher: (name: string) => {
        set((state) => ({ teacherList: (state.teacherList.filter((teacher) => teacher.name !== name)) }))
    },
    editTeacher: (name: string, status: string, subject: string) => {
        set((state) => ({ teacherList: (state.teacherList.map((teacher) => teacher.name === name ? { ...teacher, status, subject } : teacher)) }))
    }
}))

