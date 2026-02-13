import z from 'zod'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

export const resourceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  folder: z.string().min(1, 'Folder selection is required'),
  description: z.string().optional(),
  file: z
    .custom<FileList>((value) => value instanceof FileList, 'File is required')
    .superRefine((file, ctx) => {
      const first = file.item(0)

      if (!first) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File is required',
        })
        return
      }

      if (first.size <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File must not be empty',
        })
      }

      if (first.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size exceeds 20MB limit',
        })
      }

      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'video/mp4',
      ]

      if (
        !allowedTypes.includes(first.type) &&
        !first.type.startsWith('image/')
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Unsupported file type',
        })
      }
    }),
})

export type ResourceType = z.infer<typeof resourceSchema>
