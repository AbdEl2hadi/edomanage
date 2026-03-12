import z from 'zod'

const basePubNotificationSchema = z.object({
  subject: z.string().min(3, 'Subject required'),
  content: z.string().min(5, 'Content required'),
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
