import z from "zod";

export const userSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean().default(false).optional(),
    image: z.string().nullable().optional(),
    telNumber: z.string().nullable().optional(),
    role: z.enum(["student", "teacher", "admin"]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const newUserSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["student", "teacher", "admin"]),
    emailVerified: z.boolean().default(false).optional(),
    image: z.string().nullable().optional(),
    telNumber: z.string().nullable().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});
