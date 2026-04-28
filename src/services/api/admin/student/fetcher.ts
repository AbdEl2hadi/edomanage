// // import axios from 'axios';
// // import { ErrorTypes } from '../../teacher/types/apiTypes'
// // import type { ApiResponse, Filters, PaginatedApiResponse } from '../../teacher/types/apiTypes';
// // import type { StudentUser } from '../../teacher/types/modelType'
// // import type { AddStudentModel, StudentModel } from '../student/Schemas'


// // const axiosInstance = axios.create({ baseURL: '/admin/students' });



// // class BackendStudentFetcher implements StudentFetcher {

// //     async getStudents({ page, search, size, status, email, sortBy, grade, sortOrder }: Partial<Filters<StudentModel>>) {
// //         try {

// //             search && url.searchParams.append("search", search.toString())
// //             page && url.searchParams.append("page", page.toString())
// //             size && url.searchParams.append("limit", size.toString())
// //             grade && url.searchParams.append("grade", grade.toString())
// //             status && url.searchParams.append("status", status.toString())
// //             email && url.searchParams.append("email", email.toString())
// //             sortBy && url.searchParams.append("sortBy", sortBy.toString())
// //             sortOrder && url.searchParams.append("sortOrder", sortOrder.toString())

// //             const response = await fetch(url.toString())
// //             console.log({ response })
// //             const responseData = await response.json()

// //             return responseData
// //         } catch (error) {
// //             return {
// //                 success: false,
// //                 message: "error fetching students data"
// //             }
// //         }
// //     }

// //     async getStudent(id: string) {
// //         const response = await axios({
// //             method: 'get',
// //             url: `${import.meta.env.VITE_WebsiteUrl}/admin/students/${id}`,
// //         });

// //         // 1. Critical: Check if the HTTP status is in the 200-299 range
// //         if (!response.ok) {
// //             throw new Error(`Failed to fetch student: ${response.statusText}`);
// //         }

// //         return response.json() as Promise<ApiResponse<StudentUser>>;
// //     }

// //     async addStudent(student: AddStudentModel) {
// //         // console.log({ url: `http://localhost:8888/admin/students` })
// //         const response = await fetch(`http://localhost:8888/admin/students`, {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ ...student, id: crypto.randomUUID(), }),
// //         })
// //         return response.json()
// //     }

// //     async editStudent(
// //         modifiedStudent: StudentModel,
// //     ): Promise<ApiResponse<StudentModel>> {
// //         const response = await fetch(
// //             `${process.env.WebsiteUrl} /admin/students / ${modifiedStudent.id} `,
// //             {
// //                 method: 'PUT',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(modifiedStudent),
// //             },
// //         )
// //         return response.json()
// //     }

// //     async deleteStudent(id: string): Promise<ApiResponse<void>> {
// //         const response = await fetch(`${process.env.WebsiteUrl} /admin/students / ${id} `, {
// //             method: 'DELETE',
// //             headers: { 'Content-Type': 'application/json' },
// //         })
// //         return response.json()
// //     }

// // }
// // export const studentFetcher: StudentFetcher = new BackendStudentFetcher()



// // //  the new code 


// // type QueryOptionsType = Filters<StudentModel>



// // export const getStudentsQueryOptions = ({
// //     page,
// //     search,
// //     size,
// //     status,
// //     grade,
// //     sortOrder,
// //     sortBy,
// // }: QueryOptionsType) => ({
// //     queryKey: ['students', page, search, size, sortOrder, sortBy, status, grade],
// //     queryFn: async () => {
// //         const response = await studentFetcher.getStudents({
// //             page,
// //             search,
// //             size,
// //             status,
// //             sortOrder,
// //             sortBy,
// //             grade,
// //         })
// //         console.log({ response })
// //         if (response.success)
// //             return {
// //                 data: response.data,
// //                 pagination: response.pagination,
// //             }
// //         else {
// //             if (response.errorType === ErrorTypes.VALIDATION_ERROR) {
// //                 throw new Error(response.issues[0])
// //             }
// //             throw new Error(response.message)
// //         }


// //     },
// //     keepPreviousData: true,
// // })



// // // import.meta.env.DEV ? new JSONStudentFetcher() : new APIStudentFetcher();
// // // for automating the data fetching while the backend is not ready.changing the dev state will change the whole website fetching process
// // // from the json server to the backend
// import axios from 'axios';
// import { ErrorTypes } from '../../teacher/types/apiTypes';
// import type { ApiResponse, Filters, PaginatedApiResponse } from '../../teacher/types/apiTypes';
// import type { StudentUser } from '../../teacher/types/modelType';
// import type { AddStudentModel, StudentModel } from '../student/Schemas';

// const API_BASE_URL = `${import.meta.env.VITE_WebsiteUrl || 'http://localhost:8888'}/admin/students`;

// interface StudentFetcher {
//     addStudent: (student: AddStudentModel) => Promise<ApiResponse<StudentUser>>
//     getStudents: (args: Partial<Filters<StudentModel>>) => Promise<PaginatedApiResponse<StudentUser>>
//     getStudent: (id: string) => Promise<ApiResponse<StudentUser>>
//     editStudent: (modifiedStudent: StudentModel) => Promise<ApiResponse<StudentModel>>
//     deleteStudent: (id: string) => Promise<ApiResponse<void>>
// }

// class BackendStudentFetcher implements StudentFetcher {

//     async getStudents(filters: Partial<Filters<StudentModel>>) {
//         // Using global axios.get and full API_BASE_URL
//         try {
//             const { data } = await axios.get<PaginatedApiResponse<StudentUser>>(API_BASE_URL, {
//                 params: {
//                     search: filters.search,
//                     page: filters.page,
//                     limit: filters.size,
//                     grade: filters.grade,
//                     status: filters.status,
//                     email: filters.email,
//                     sortBy: filters.sortBy,
//                     sortOrder: filters.sortOrder,
//                 }
//             });
//             return data;
//         }
//         catch (error:any) {
//             if (axios.isAxiosError(error)) {
//                 if (error.response) {
//                     console.error("Server Error:", error.response.status, error.response.data);
//                 } else if (error.request) {
//                     console.error("Network Error:", error.request);
//                 }
//             } else {
//                 console.error("General Error:", error.message);
//             }
//             throw error;
//         }
//     }

//     async getStudent(id: string) {
//         try {
//             const { data } = await axios.get<ApiResponse<StudentUser>>(`${API_BASE_URL}/${id}`);
//             return data;
//         } catch (error: any) {
//             if (axios.isAxiosError(error)) {
//                 if (error.response) {
//                     console.error("Server Error:", error.response.status, error.response.data);
//                 } else if (error.request) {
//                     console.error("Network Error:", error.request);
//                 }
//             } else {
//                 console.error("General Error:", error.message);
//             }
//             throw error; // Re-throw so TanStack Query knows the request failed
//         }
//     }

//     async addStudent(student: AddStudentModel) {
//         const { data } = await axios.post<ApiResponse<StudentUser>>(API_BASE_URL, {
//             ...student,
//             id: crypto.randomUUID(),
//         });
//         return data;
//     }

//     async editStudent(modifiedStudent: StudentModel) {
//         const { data } = await axios.put<ApiResponse<StudentModel>>(
//             `${API_BASE_URL}/${modifiedStudent.id}`,
//             modifiedStudent
//         );
//         return data;
//     }

//     async deleteStudent(id: string) {
//         const { data } = await axios.delete<ApiResponse<void>>(`${API_BASE_URL}/${id}`);
//         return data;
//     }
// }

// export const studentFetcher: StudentFetcher = new BackendStudentFetcher();



import axios from 'axios';
import type { ApiResponse, Filters, PaginatedApiResponse } from '../../teacher/types/apiTypes';
import type { AddStudentWithUser, StudentWithUser } from '../student/Schemas';



interface StudentFetcher {
    addStudent: (student: AddStudentWithUser) => Promise<ApiResponse<StudentWithUser>>
    getStudents: (args: Partial<Filters<StudentWithUser>>) => Promise<PaginatedApiResponse<StudentWithUser>>
    getStudent: (id: string) => Promise<ApiResponse<StudentWithUser>>
    editStudent: (modifiedStudent: StudentWithUser) => Promise<ApiResponse<StudentWithUser>>
    deleteStudent: (id: string) => Promise<ApiResponse<void>>
}

class BackendStudentFetcher implements StudentFetcher {

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
        try {
            console.log(studentId);
            const response = await axios<ApiResponse<StudentWithUser>>({
                method: "GET",
                url: `http://localhost:8888/admin/students/${studentId}`,
            });
            console.log(response)
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("getStudent - Server Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("getStudent - Network Error:", error.request);
                }
            } else {
                console.error("getStudent - General Error:", error.message);
            }
            throw error;
        }
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
        try {
            const { data } = await axios.delete<ApiResponse<void>>(`${import.meta.env.VITE_WebsiteUrl}/admin/students/${id}`);
            return data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("deleteStudent - Server Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("deleteStudent - Network Error:", error.request);
                }
            } else {
                console.error("deleteStudent - General Error:", error.message);
            }
            throw error;
        }
    }
}

export const studentFetcher: StudentFetcher = new BackendStudentFetcher();
