import axios from 'axios'
import { useAuthStore } from '@/services/store/auth_store'

export { isAxiosError } from 'axios'

export const api = axios.create({
  baseURL: '/',
  withCredentials: true,
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
  token: string
}

export async function syncAuthSession(): Promise<string | null> {
  const { setToken } = useAuthStore.getState()

  try {
    const response = await api.post<RefreshSessionResponse>('/auth/refresh')
    const token = response.data.token

    if (typeof token === 'string' && token.length > 0) {
      setToken(token)
      return token
    }

    setToken(null)
    return null
  } catch {
    setToken(null)
    return null
  }
}
