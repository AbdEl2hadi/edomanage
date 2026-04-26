import axios from 'axios'
import { useAuthStore , type  AuthUser } from '@/services/store/auth_store'

export { isAxiosError } from 'axios'

export const api = axios.create({
  baseURL: '/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

type RefreshSessionResponse = {
  user : AuthUser
  token: string
}

// * fetch to get new refresh token
export async function syncAuthSession(): Promise<string | null> {
  const { setToken , setUser } = useAuthStore.getState()

  try {
    const response = await api.post<RefreshSessionResponse>('/auth/refresh')
    const  {user , token } = response.data

    if (typeof token === 'string' && token.length > 0) {
      setToken(token)
      setUser(user)
      return token
    }

    setToken(null)
    setUser(null)
    return null
  } catch {
    setToken(null)
    setUser(null)
    return null
  }
}
