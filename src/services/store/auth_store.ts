import { create } from 'zustand'

export type AuthUserInfo =
  | AuthUserInfoAdmin
  | AuthUserInfoTeacher
  | AuthUserInfoStudent

type AuthUserInfoAdmin = {
  id: string
  userId: string
  schoolName: string
  numberStudents: number
  numberTeachers: number
  schoolIconFileId: string | null
}
type AuthUserInfoTeacher = {
  id: string
  schoolId: string
  userId: string
  grade: string | null
  classe: string | null
  parentPhoneNumber: string | null
  parentName: string | null
  status: string
  gender: string | null
  address: string | null
  dateOfBirth: string | null
  studentPictureFileId: string | null
}
type AuthUserInfoStudent = {
  id: string
  schoolId: string
  userId: string
  gender: string | null
  telNumber: string | null
  address: string | null
  subjects: string | null
  dateOfBirth: string | null
  joiningDate: string | null
  status: string
  teacherPictureFileId: string | null
}

export type AuthUser = {
  id: string
  name: string
  email: string
  role: string
  emailVerified: boolean
  image: string | null
  createdAt: string
  updatedAt: string
  info?: AuthUserInfo
}

export type AuthState = {
  user: AuthUser | null
  token: string | null
  setToken: (token: string | null) => void
  setUser: (user: AuthUser | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, token: null }),
}))
