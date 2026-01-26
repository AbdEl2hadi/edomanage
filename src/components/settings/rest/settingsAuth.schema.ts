import { z } from 'zod'

export const NewInfoSchema = z
  .object({
    id: z.number().optional(),
    fullName: z.string().min(1, 'Full name is required'),
    phoneNumber: z
      .string()
      .regex(/^(?:06|05|07)\d{8}$/, 'Phone number is not valid'),
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
