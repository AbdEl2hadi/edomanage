import { z } from 'zod'

export const NewInfoSchema = z
  .object({
    id: z.number().optional(),
    fullName: z.string().min(1, 'Full name is required'),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    aboutMe: z.string().optional(),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type NewInfoFields = z.infer<typeof NewInfoSchema>
