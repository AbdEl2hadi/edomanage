import { z } from "zod"
import { newUserSchema, userSchema } from "./UserSchemas";

export const teacherSchema = z.object({
    id: z.string().optional(),
    userId: z.string().nullable().optional(),
    schoolId: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
    subject: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    joiningDate: z.string().nullable().optional(),
    teacherPictureFileId: z.string().nullable().optional(),
});

export const teacherWithUserSchema = teacherSchema.extend({
    user: userSchema,
});

export const addTeacherSchema = z.object({
    id: z.string().optional(),
    schoolId: z.string().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    joiningDate: z.string().nullable().optional(),
    status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
    subject: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    teacherPictureFileId: z.string().nullable().optional(),
});

export const addTeacherWithUserSchema = addTeacherSchema.extend({
    user: newUserSchema,
});
