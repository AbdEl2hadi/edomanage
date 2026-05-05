import z from "zod";
import { AuthUserSchema } from "./UserSchemas";

export const studentSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    schoolId: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
    grade: z.string().nullable().optional(),
    class: z.string().nullable().optional(),
    parentPhoneNumber: z.string().nullable().optional(),
    parentName: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    studentPictureFileId: z.string().nullable().optional(),
});

export const studentWithUserSchema = AuthUserSchema.extend({
    info: studentSchema.optional(),
});

export const addStudentSchema = z.object({
    schoolId: z.string(),
    id: z.string().optional(),
    userId: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
    grade: z.string().nullable().optional(),
    class: z.string().nullable().optional(),
    parentPhoneNumber: z.string().nullable().optional(),
    parentName: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    studentPictureFileId: z.string().nullable().optional(),
});

export const addStudentWithUserSchema = addStudentSchema.extend({
    user: AuthUserSchema,
});
