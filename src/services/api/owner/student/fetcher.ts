import type { StudentModel } from './Schemas'
import type {
  ApiResponse,
  Filters,
  PaginatedApiResponse,
} from '../types/apiTypes'

interface StudentFetcher {
  addStudent: (student: StudentModel) => Promise<ApiResponse<StudentModel>>
  getStudents: (
    args: Partial<Filters<StudentModel>>,
  ) => Promise<PaginatedApiResponse<StudentModel>>
  getStudent: (id: string) => Promise<ApiResponse<StudentModel>>
  editStudent: (
    modifiedStudent: StudentModel,
  ) => Promise<ApiResponse<StudentModel>>
  deleteStudent: (id: string) => Promise<ApiResponse<void>>
}

class JSONStudentFetcher implements StudentFetcher {
  async addStudent(student: StudentModel): Promise<ApiResponse<StudentModel>> {
    const response = await fetch('http://localhost:4000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
    return response.json()
  }

  async getStudents({
    pageIndex,
    search,
    pageSize,
  }: Partial<Filters<StudentModel>>): Promise<
    PaginatedApiResponse<StudentModel>
  > {
    try {
      const url = new URL('http://localhost:4000/students')
      search && url.searchParams.append('q', search.toString())
      pageIndex && url.searchParams.append('_page', pageIndex.toString())
      pageSize && url.searchParams.append('_limit', pageSize.toString())
      console.log(url)
      const response = await fetch(url.toString())

      const students: Array<StudentModel> = await response.json()
      const totalElements = Number(response.headers.get('X-Total-Count') ?? 0)
      const totalPages = Math.ceil(totalElements / (pageSize || 10))

      return {
        success: true,
        data: students,
        message: '',
        pagination: {
          totalElements: totalElements,
          totalPages: totalPages,
        },
      }
    } catch (error) {
      throw new Error('error fetching students data')
    }
  }

  async getStudent(id: string): Promise<ApiResponse<StudentModel>> {
    try {
      const url = new URL(`http://localhost:4000/students/${id}`)

      const response = await fetch(url.toString())
      const data: StudentModel = await response.json()
      return {
        success: true,
        message: '',
        data: data,
      }
    } catch (error) {
      throw new Error('error fetching students data')
    }
  }

  async editStudent(
    modifiedStudent: StudentModel,
  ): Promise<ApiResponse<StudentModel>> {
    const response = await fetch(
      `http://localhost:4000/students/${modifiedStudent.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modifiedStudent),
      },
    )
    return response.json()
  }

  async deleteStudent(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`http://localhost:4000/students/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    return response.json()
  }
}

// ============== class for backend fetching ==============

// class APIStudentFetcher implements StudentFetcher {
//     getStudents(): PaginatedApiResponse<string> {
//         return {} as any
//     }

//     getStudent(): ApiResponse<string> {
//         return 0 as any
//     }
// }

export const studentFetcher: StudentFetcher = new JSONStudentFetcher()
// import.meta.env.DEV ? new JSONStudentFetcher() : new APIStudentFetcher();
// for automating the data fetching while the backend is not ready.changing the dev state will change the whole website fetching process
// from the json server to the backend
