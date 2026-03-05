import z from 'zod'

const ACCEPTED_MIME_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/avif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation',
])

const ACCEPTED_EXTENSIONS = new Set([
  'pdf',
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  'bmp',
  'avif',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'txt',
  'csv',
  'odt',
  'ods',
  'odp',
])

const isAcceptedAttachmentFile = (file: File): boolean => {
  const mimeType = file.type.toLowerCase()
  if (mimeType && ACCEPTED_MIME_TYPES.has(mimeType)) {
    return true
  }

  const extension = file.name.split('.').pop()?.toLowerCase()
  return Boolean(extension && ACCEPTED_EXTENSIONS.has(extension))
}

const basePubNotificationSchema = z.object({
  subject: z.string().min(3, 'Subject required'),
  content: z.string().min(5, 'Content required'),
  attachments: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          'Each file must be 5MB or less',
        )
        .refine(
          isAcceptedAttachmentFile,
          'Allowed: PDF, images, Word, Excel, PowerPoint, CSV, TXT, and OpenDocument files',
        ),
    )
    .max(3, 'You can upload up to 3 files')
    .default([]),
  sendTo: z.array(z.string()).default([]),
  type: z.enum([
    'Urgent',
    'Teacher',
    'Administrative',
    'User',
    'Grade',
    'Book',
  ]),
})

export const getPubNotificationSchema = (role: 'teacher' | 'admin') => {
  if (role === 'teacher') {
    return basePubNotificationSchema
  }

  return basePubNotificationSchema.refine((data) => data.sendTo.length > 0, {
    path: ['sendTo'],
    message: 'Select at least one',
  })
}

export type PubNotificationType = z.input<typeof basePubNotificationSchema>
