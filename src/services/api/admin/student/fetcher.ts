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
        const { data } = await axios<ApiResponse<StudentWithUser>>(
            {
                url: `/admin/students`,
                method: "POST",
                data: student,
            }
        );
        return data;
    }


    async getStudents(filters: Partial<Filters<StudentWithUser>>) {
        const { data } = await axios<PaginatedApiResponse<StudentWithUser>>({
            method: "GET",
            url: `/admin/students`,
            params: {
                search: filters.search,
                page: filters.pageIndex,
                limit: filters.pageSize,
                grade: filters.info?.grade,
                status: filters.info?.status,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
            }
        });
        return data;
    }

    async getStudent(studentId: string) {
        const { data } = await axios<ApiResponse<StudentWithUser>>({
            method: "GET",
            url: `/admin/students/${studentId}`,
        });
        return data;
    }



    async editStudent(modifiedStudent: StudentWithUser) {
        try {
            const { data } = await axios.put<ApiResponse<StudentWithUser>>(
                `/admin/students/${modifiedStudent.id}`,
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
        const { data } = await axios<ApiResponse<void>>({
            method: "DELETE",
            url: `/admin/students/${id}`,
        });
        return data;
    }
}

export const studentFetcher: IStudentFetcher = new StudentFetcher();
