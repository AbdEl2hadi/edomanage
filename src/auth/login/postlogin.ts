import { useMutation } from '@tanstack/react-query'
import type { AuthUser } from '@/services/store/auth_store'
import { api, isAxiosError } from '@/lib/api'
import { useAuthStore } from '@/services/store/auth_store'

type LoginErrorPayload = {
  message?: unknown
  error?: unknown
}

type LoginRequest = {
  email: string
  password: string
  rememberMe: boolean
  role: 'admin' | 'teacher' | 'student'
  callbackURL?: string
}

export type LoginSuccessPayload = {
  redirect?: boolean
  token?: string
  url?: string
  user?: AuthUser
}

export type LoginResult = {
  ok: boolean
  message?: string
  data?: LoginSuccessPayload
}

const getErrorMessage = (payload: unknown): string | null => {
  if (!payload) {
    return null
  }

  if (typeof payload === 'string') {
    return payload
  }

  if (typeof payload !== 'object') {
    return null
  }

  const data = payload as Record<string, unknown>

  if (typeof data.message === 'string') {
    return data.message
  }

  if (data.message && typeof data.message === 'object') {
    const nested = data.message as Record<string, unknown>

    if (typeof nested.message === 'string') {
      return nested.message
    }
  }

  if (typeof data.error === 'string') {
    return data.error
  }

  return null
}

export async function postLogin(data: LoginRequest): Promise<LoginResult> {
  try {
    const response = await api.post<LoginSuccessPayload>('/auth/login', {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      callbackURL: data.callbackURL,
      role: data.role,
    })

    return { ok: true, data: response.data }
  } catch (error) {
    console.error('Login error:', error)
    if (isAxiosError<LoginErrorPayload>(error)) {
      const serverMessage =
        getErrorMessage(error.response?.data) ??
        getErrorMessage(error.message) ??
        'Login failed. Please check your credentials.'

      return { ok: false, message: serverMessage }
    }

    return { ok: false, message: 'Login failed. Please try again.' }
  }
}

export const useLogin = () => {
  return useMutation<LoginResult, never, LoginRequest>({
    mutationFn: postLogin,
    onSuccess: (result) => {
      if (!result.ok || !result.data) {
        return
      }

      const payload = result.data

      const { setToken, setUser } = useAuthStore.getState()

      if (typeof payload.token === 'string' && payload.token.length > 0) {
        setToken(payload.token)
      }

      if (payload.user && typeof payload.user === 'object') {
        setUser(payload.user)
      }
    },
  })
}
