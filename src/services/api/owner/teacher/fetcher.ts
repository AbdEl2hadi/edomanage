import type { TeacherModel } from "../teacher/Schemas";
import type { ApiResponse, Filters, PaginatedApiResponse } from "../types/apiTypes";


interface TeacherFetcher {
  addTeacher: (Teacher: TeacherModel) => Promise<ApiResponse<TeacherModel>>
  getTeachers: (args: Partial<Filters<TeacherModel>>) => Promise<PaginatedApiResponse<TeacherModel>>
  getTeacher: (id: string) => Promise<ApiResponse<TeacherModel>>
  editTeacher: (modifiedTeacher: TeacherModel) => Promise<ApiResponse<TeacherModel>>
  deleteTeacher: (id: string) => Promise<ApiResponse<void>>
}

class JSONTeacherFetcher implements TeacherFetcher {
  async addTeacher(teacher: TeacherModel): Promise<ApiResponse<TeacherModel>> {
    const response = await fetch('http://localhost:4000/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher),
    })
    return response.json()
  }

  async getTeachers({ page, search, size, status, email, sortBy, sortOrder }: Partial<Filters<StudentModel>>): Promise<PaginatedApiResponse<TeacherModel>> {
    try {
      const url = new URL("http://localhost:8080/students")
      search && url.searchParams.append("search", search.toString())
      page && url.searchParams.append("page", page.toString())
      size && url.searchParams.append("limit", size.toString())
      status && url.searchParams.append("status", status.toString())
      email && url.searchParams.append("email", email.toString())
      sortBy && url.searchParams.append("sortBy", sortBy.toString())
      sortOrder && url.searchParams.append("sortOrder", sortOrder.toString())

      const response = await fetch(url.toString())

      const responseData = await response.json()

      return responseData
    } catch (error) {
      return {
        success: false,
        message: "error fetching students data"
      }
    }
  }
  async getTeacher(id: string): Promise<ApiResponse<TeacherModel>> {
    return fetch(`http://localhost:4000/teachers/${id}`).then((response) =>
      response.json(),
    )
  }

  async editTeacher(modifiedTeacher: TeacherModel): Promise<ApiResponse<TeacherModel>> {
    const response = await fetch(
      `http://localhost:4000/teachers/${modifiedTeacher.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modifiedTeacher),
      },
    )
    return response.json()
  }

  async deleteTeacher(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`http://localhost:4000/teachers/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  }

}


export const teacherFetcher = new JSONTeacherFetcher()
