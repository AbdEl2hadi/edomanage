import z from 'zod'

export const PubNotificationSchema = z.object({
  subject: z.string().min(3, 'Subject required'),
  content: z.string().min(5, 'Content required'),
  sendTo: z.array(z.string()).min(1, 'Select at least one'),
})

export type PubNotificationType = z.infer<typeof PubNotificationSchema>
