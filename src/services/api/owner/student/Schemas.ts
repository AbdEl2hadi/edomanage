import z from "zod"

export const StudentSchema = z.object({
    id: z.string(),
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(20, { message: 'Name must be at most 20 characters' }),
    email: z.string().email({ message: 'Invalid email address' }).nonempty({ message: 'Email is required' }),
    grade: z.string().nonempty({ message: 'Grade is required' }),
    parentPhoneNumber: z.string().min(8, { message: 'Parent phone number is too short' }).max(15, { message: 'Parent phone number is too long' }),
    parentName: z.string().nonempty({ message: 'Parent name is required' }),
    status: z.string().nonempty({ message: 'Status is required' }),
    imgSrc: z.string().optional(),
    gender: z.enum(['male', 'female']),
    address: z.string(),
    dateOfBirth: z.string().nonempty(),
    enrollmentDate: z.string().optional(),
})
export type StudentModel = z.infer<typeof StudentSchema>


// edit student type and schema
export const EditStudentSchema = StudentSchema.omit({ id: true })
export type EditStudentModel = z.infer<typeof EditStudentSchema>


// add student type and schema
export const AddStudentSchema = StudentSchema.omit({ id: true, status: true })
export type AddStudentModel = z.infer<typeof AddStudentSchema>
