import { useMutation } from '@tanstack/react-query'
import type { AuthUser } from '@/services/store/auth_store'
import { api, isAxiosError } from '@/lib/api'
import { useAuthStore } from '@/services/store/auth_store'

type RegisterRequest = {
  fullName: string
  schoolName: string
  email: string
  password: string
  confirmPassword: string
  rememberMe: boolean
  callbackURL: string
}

type RegisterErrorPayload = {
  message?: unknown
  error?: unknown
}

export type RegisterSuccessPayload = {
  token?: string
  user?: AuthUser
  schoolId?: string
  schoolName?: string
}

export type RegisterResult = {
  ok: boolean
  message?: string
  data?: RegisterSuccessPayload
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

export async function postSignup(
  data: RegisterRequest,
): Promise<RegisterResult> {
  try {
    const response = await api.post<RegisterSuccessPayload>('/auth/register', {
      fullName: data.fullName,
      schoolName: data.schoolName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      rememberMe: data.rememberMe,
      callbackURL: data.callbackURL,
    })

    return { ok: true, data: response.data }
  } catch (error) {
    if (isAxiosError<RegisterErrorPayload>(error)) {
      const serverMessage =
        getErrorMessage(error.response?.data) ??
        getErrorMessage(error.message) ??
        'Sign up failed. Please try again.'

      return { ok: false, message: serverMessage }
    }

    return { ok: false, message: 'Sign up failed. Please try again.' }
  }
}

export const useSignup = () => {
  return useMutation<RegisterResult, never, RegisterRequest>({
    mutationFn: postSignup,
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
