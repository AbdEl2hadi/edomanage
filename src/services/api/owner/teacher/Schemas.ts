import { z } from "zod";

export const TeacherSchema = z.object({
    name: z.string().min(4, "Min name length is 4").max(20, "Max name length is 20"),
    id: z.string(),
    gender: z.enum(["male", "female"], { errorMap: () => ({ message: "Gender is required" }), }),
    email: z.string().email("Invalid email"),
    number: z.string().min(6, "Number must be at least 6 digits").max(15, "Number must be max 15 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    address: z.string().nonempty('Address is required'),
    subjects: z.array(z.string()).min(1, "At least one subject is required"),
    departement: z.string(),
    dateOfBirth: z.string(),
    joiningDate: z.string(),
    imgSrc: z.string().url("Invalid image URL").optional(),
    status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
    role: z.enum(["admin", "teacher", "student"]).optional(),
})

export type TeacherModel = z.infer<typeof TeacherSchema>

export const EditTeacherSchema = TeacherSchema.omit({ id: true, role: true, password: true })
export type EditTeacherModel = z.infer<typeof EditTeacherSchema>



