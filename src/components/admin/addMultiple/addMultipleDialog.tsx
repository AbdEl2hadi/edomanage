import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CheckCircle, File, Loader2, Upload, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { useAddMultiple } from './addMultiple'

interface AddMultipleDialogProps {
  type: 'Teachers' | 'Students'
  schoolId: string
  onSuccess?: (message?: string) => void
  onError?: (error: Error) => void
}

export function AddMultipleDialog({
  type,
  schoolId,
  onSuccess,
  onError,
}: AddMultipleDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const mutation = useAddMultiple(type, schoolId, setUploadProgress, {
    onSuccess: (data) => {
      if (data.success) {
        setSelectedFile(null)
        setUploadProgress(0)
        setOpen(false)
        onSuccess?.(data.message)
      } else {
        setSelectedFile(null)
        setUploadProgress(0)
        onError?.(new Error(data.message))
      }
    },
    onError: (error: Error) => {
      setSelectedFile(null)
      setUploadProgress(0)
      onError?.(error)
    },
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0])
      }
    },
  })

  const handleSubmit = () => {
    if (selectedFile) {
      mutation.mutate([selectedFile])
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer">
          <Upload size={18} />
          Add Multiple {type}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Multiple {type}</DialogTitle>
          <DialogDescription>
            Upload an Excel file to add multiple {type.toLowerCase()} to the
            system at once.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-105'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500'
            } ${selectedFile ? 'border-green-500 bg-green-50 dark:bg-green-950/30' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-3">
              {selectedFile ? (
                <>
                  <CheckCircle
                    className="text-green-500 dark:text-green-400"
                    size={40}
                  />
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    File selected:
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </>
              ) : (
                <>
                  <Upload
                    size={40}
                    className={`transition-colors ${
                      isDragActive
                        ? 'text-blue-500'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    {isDragActive
                      ? 'Drop your Excel file here'
                      : 'Drag & drop your Excel file here'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    or click to select a file
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Supported formats: .xlsx, .xls, .csv
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {mutation.isPending && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Uploading...
                </p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {uploadProgress}%
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 mx-3 cursor-pointer"
              disabled={mutation.isPending}
            >
              <X size={18} />
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || mutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {mutation.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <File size={18} />
                Upload File
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
