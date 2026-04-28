import type z from "zod";
import type { addTeacherSchema, addTeacherWithUserSchema, teacherSchema, teacherWithUserSchema } from "../Schemas/TeacherSchemas";

export type TeacherModel = z.infer<typeof teacherSchema>

export type TeacherWithUser = z.infer<typeof teacherWithUserSchema>

export type AddTeacherModel = z.infer<typeof addTeacherSchema>

export type AddTeacherWithUser = z.infer<typeof addTeacherWithUserSchema>

