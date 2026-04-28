import type z from "zod";
import type { addStudentSchema, addStudentWithUserSchema, studentSchema, studentWithUserSchema } from "../Schemas/StudentSchemas";

export type StudentModel = z.infer<typeof studentSchema>

export type StudentWithUser = z.infer<typeof studentWithUserSchema>

export type AddStudentModel = z.infer<typeof addStudentSchema>

export type AddStudentWithUser = z.infer<typeof addStudentWithUserSchema>

