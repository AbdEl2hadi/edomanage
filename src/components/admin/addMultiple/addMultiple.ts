import { useMutation } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import type { UseMutationOptions } from '@tanstack/react-query'

interface ProgressEvent {
  loaded: number
  total?: number
}

// API function
const uploadFilesAPI = async (
  files: Array<File> | null,
  type: string,
  schoolId: string,
  onProgress?: (progress: number) => void,
) => {
  const file = files?.[0]

  if (!file) {
    throw new Error('No file provided')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type.toLowerCase())
  formData.append('schoolId', schoolId)

  try {
    const response = await api.post('/api/admin/add-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event: ProgressEvent) => {
        if (event.total) {
          const progress = Math.round((event.loaded / event.total) * 100)
          onProgress?.(progress)
        }
      },
    })

    const { success, message } = response.data
    
    
    if (!success) {
      return { success: false, message }
    }
    
    return { success, message }
  } catch (err: any) {
    
    const errorMessage =
      err.response?.data?.message || err.message || 'Failed to upload file'
    throw new Error(errorMessage)
  }
}


interface UploadResponse {
  success: boolean
  message: string
}

export function useAddMultiple(
  type: string,
  schoolId: string,
  onProgress?: (progress: number) => void,
  options?: UseMutationOptions<UploadResponse, Error, Array<File>>,
) {
  return useMutation({
    mutationFn: (files: Array<File>) =>
      uploadFilesAPI(files, type, schoolId, onProgress),
    ...options,
  })
}

export async function addMultiple(
  files: Array<File>,
  type: string,
  schoolId: string,
) {
  return uploadFilesAPI(files, type, schoolId)
}
