import axios from "axios";
import type { TeacherWithUser } from "@/lib/Types/TeacherTypes";
import type { ApiResponse, Filters, PaginatedApiResponse } from "../../teacher/types/apiTypes";




interface ITeacherFetcher {
  addTeacher: (Teacher: TeacherWithUser) => Promise<ApiResponse<TeacherWithUser>>
  getTeachers: (
    args: Partial<Filters<TeacherWithUser>>,
  ) => Promise<PaginatedApiResponse<TeacherWithUser>>
  getTeacher: (id: string) => Promise<ApiResponse<TeacherWithUser>>
  editTeacher: (
    modifiedTeacher: TeacherWithUser,
  ) => Promise<ApiResponse<TeacherWithUser>>
  deleteTeacher: (id: string) => Promise<ApiResponse<void>>
}

class TeacherFetcher implements ITeacherFetcher {
  async addTeacher(teacher: TeacherWithUser): Promise<ApiResponse<TeacherWithUser>> {
    const response = await axios({
      method: 'POST',
      url: `${process.env.WebsiteUrl}/admin/teachers`,
      data: teacher,
    })
    return response.data
  }

  async getTeachers(filters: Partial<Filters<TeacherWithUser>>) {
    // name and email should be added in here 

    const { data } = await axios<PaginatedApiResponse<TeacherWithUser>>({
      method: 'GET',
      url: `${process.env.WebsiteUrl}/admin/teachers`,
      params: {
        search: filters.search,
        page: filters.page,
        limit: filters.size,
        status: filters.status,
        // email: filters.email,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }
    })
    return data;
  }


  async getTeacher(id: string): Promise<ApiResponse<TeacherWithUser>> {
    const { data } = await axios<ApiResponse<TeacherWithUser>>({
      method: 'GET',
      url: `${process.env.WebsiteUrl}/admin/teachers/${id}`,
    })
    return data
  }

  async editTeacher(
    modifiedTeacher: TeacherWithUser,
  ): Promise<ApiResponse<TeacherWithUser>> {
    const response = await axios<ApiResponse<TeacherWithUser>>({
      method: 'PUT',
      url: `${process.env.WebsiteUrl}/admin/teachers/${modifiedTeacher.id}`,
      data: modifiedTeacher,
    })
    return response.data
  }

  async deleteTeacher(id: string): Promise<ApiResponse<void>> {
    const response = await axios<ApiResponse<void>>({
      method: 'DELETE',
      url: `${process.env.WebsiteUrl}/admin/teachers/${id}`,
    })
    return response.data
  }
}

export const teacherFetcher: ITeacherFetcher = new TeacherFetcher()