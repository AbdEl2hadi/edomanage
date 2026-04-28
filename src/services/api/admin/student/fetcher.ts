import axios from 'axios';
import type { AddStudentWithUser, StudentWithUser } from '@/lib/Types/StudentTypes';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/Types/ApiTypes';
import type { Filters } from '@/lib/Types/FilterTypes';



interface IStudentFetcher {
    addStudent: (student: AddStudentWithUser) => Promise<ApiResponse<StudentWithUser>>
    getStudents: (args: Partial<Filters<StudentWithUser>>) => Promise<PaginatedApiResponse<StudentWithUser>>
    getStudent: (id: string) => Promise<ApiResponse<StudentWithUser>>
    editStudent: (modifiedStudent: StudentWithUser) => Promise<ApiResponse<StudentWithUser>>
    deleteStudent: (id: string) => Promise<ApiResponse<void>>
}

class StudentFetcher implements IStudentFetcher {

    // Add Student with User Details
    async addStudent(student: AddStudentWithUser) {
        try {
            const { data } = await axios<ApiResponse<StudentWithUser>>(
                {
                    url: `${import.meta.env.VITE_WebsiteUrl}/admin/students`,
                    method: "POST",
                    data: student,
                }
            );
            return data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("addStudent - Server Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("addStudent - Network Error:", error.request);
                }
            } else {
                console.error("addStudent - General Error:", error.message);
            }
            throw error;
        }
    }


    async getStudents(filters: Partial<Filters<StudentWithUser>>) {
        const { data } = await axios<PaginatedApiResponse<StudentWithUser>>({
            method: "GET",
            url: `${import.meta.env.VITE_WebsiteUrl}/admin/students`,
            params: {
                search: filters.search,
                page: filters.page,
                limit: filters.size,
                grade: filters.grade,
                status: filters.status,
                // email: filters.email,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
            }
        });
        return data;
    }

    async getStudent(studentId: string) {
        // try {
        const { data } = await axios<ApiResponse<StudentWithUser>>({
            method: "GET",
            url: `${import.meta.env.VITE_WebsiteUrl}/admin/students/${studentId}`,
        });
        return data;
        // } catch (error: any) {
        //     if (axios.isAxiosError(error)) {
        //         if (error.response) {
        //             console.error("getStudent - Server Error:", error.response.status, error.response.data);
        //         } else if (error.request) {
        //             console.error("getStudent - Network Error:", error.request);
        //         }
        //     } else {
        //         console.error("getStudent - General Error:", error.message);
        //     }
        //     throw error;
        // }
    }



    async editStudent(modifiedStudent: StudentWithUser) {
        try {
            const { data } = await axios.put<ApiResponse<StudentWithUser>>(
                `${import.meta.env.VITE_WebsiteUrl}/admin/students/${modifiedStudent.id}`,
                modifiedStudent
            );
            return data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("editStudent - Server Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("editStudent - Network Error:", error.request);
                }
            } else {
                console.error("editStudent - General Error:", error.message);
            }
            throw error;
        }
    }

    async deleteStudent(id: string) {
        // try {
        const { data } = await axios<ApiResponse<void>>({
            method: "DELETE",
            url: `${import.meta.env.VITE_WebsiteUrl}/admin/students/${id}`,
        });
        return data;
        // } catch (error: any) {
        //     if (axios.isAxiosError(error)) {
        //         if (error.response) {
        //             console.error("deleteStudent - Server Error:", error.response.status, error.response.data);
        //         } else if (error.request) {
        //             console.error("deleteStudent - Network Error:", error.request);
        //         }
        //     } else {
        //         console.error("deleteStudent - General Error:", error.message);
        //     }
        //     throw error;
        // }
    }
}

export const studentFetcher: IStudentFetcher = new StudentFetcher();
