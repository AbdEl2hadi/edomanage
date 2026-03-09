import type { ApiResponse, PaginatedApiResponse } from "../types/apiTypes";
import type { TeacherModel} from "../types/modelTypes";

interface TeacherFetcher {
    addTeacher: (Teacher: TeacherModel) => Promise<ApiResponse<TeacherModel>>
    getTeachers: () => Promise<PaginatedApiResponse<TeacherModel>>
    getTeacher: (id: string) => Promise<ApiResponse<TeacherModel>> // still not implemented
    editTeacher: (modifiedTeacher: TeacherModel) => Promise<ApiResponse<TeacherModel>>
    deleteTeacher: (id: string) => Promise<ApiResponse<void>>
}

class JSONTeacherFetcher implements TeacherFetcher {
    async addTeacher(teacher: TeacherModel): Promise<ApiResponse<TeacherModel>> {
        const response = await fetch("http://localhost:4000/teachers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teacher),
        });
        return response.json();
    }

    async getTeachers(): Promise<PaginatedApiResponse<TeacherModel>> {
        try {
            const response = await fetch("http://localhost:4000/teachers")
            const data: Array<TeacherModel> = await response.json()

            return {
                success: true,
                message: "Teachers fetched successfully",
                data: data, // initialize to empty array if undefined
                pagination: {
                    totalPages: 1, // JSON Server doesn’t paginate, default 1
                    totalElements: data.length || 0 // initialize to 0 if undefined
                }
            }
        } catch (error) {
            return {
                success: false,
                message: "Error fetching teachers"
            }
        }
        // try {
        //     const response = await fetch("http://localhost:4000/teachers");
        //     const data: Array<TeacherModel> = await response.json()
        //     return {
        //         success: true,
        //         message: "Teachers fetched",
        //         data: data,
        //         pagination: {
        //             totalPages: 1,
        //             totalElements: data.length
        //         }
        //     }
        // } catch (error) {
        //     throw new Error("error fetching teachers data");
        // }
    }

    async editTeacher(modifiedTeacher: TeacherModel): Promise<ApiResponse<TeacherModel>> {
        const response = await fetch(`http://localhost:4000/teachers/${modifiedTeacher.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modifiedTeacher),
        });
        return response.json();
    }

    async deleteTeacher(id: string): Promise<ApiResponse<void>> {
        const response = await fetch(`http://localhost:4000/teachers/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        return response.json();
    }

    async getTeacher(id: string): Promise<ApiResponse<TeacherModel>> {
        const response = await fetch(`http://localhost:4000/teachers/${id}`);
        return response.json();
    }

}

export const teacherFetcher = new JSONTeacherFetcher();