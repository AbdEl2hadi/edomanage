import z from "zod";

// export const userSchema = z.object({
//     id: z.string().optional(),
//     name: z.string(),
//     email: z.string().email(),
//     emailVerified: z.boolean().default(false).optional(),
//     image: z.string().nullable().optional(),
//     telNumber: z.string().nullable().optional(),
//     role: z.enum(["student", "teacher", "admin"]),
//     createdAt: z.date().optional(),
//     updatedAt: z.date().optional(),
// });


// export const newUserSchema = z.object({
//     id: z.string().optional(),
//     name: z.string(),
//     email: z.string().email(),
//     role: z.enum(["student", "teacher", "admin"]),
//     emailVerified: z.boolean().default(false).optional(),
//     image: z.string().nullable().optional(),
//     telNumber: z.string().nullable().optional(),
//     createdAt: z.date().optional(),
//     updatedAt: z.date().optional(),
// });


export const AuthUserInfoAdminSchema = z.object({
    id: z.string(),
    userId: z.string(),
    schoolName: z.string(),
    numberStudents: z.number(),
    numberTeachers: z.number(),
    schoolIconFileId: z.string().nullable(),
});

export const AuthUserInfoTeacherSchema = z.object({
    id: z.string(),
    schoolId: z.string(),
    userId: z.string(),
    grade: z.string().nullable(),
    classe: z.string().nullable(),
    parentPhoneNumber: z.string().nullable(),
    parentName: z.string().nullable(),
    status: z.string(),
    gender: z.string().nullable(),
    address: z.string().nullable(),
    dateOfBirth: z.string().nullable(), // or .datetime()
    studentPictureFileId: z.string().nullable(),
});

export const AuthUserInfoStudentSchema = z.object({
    id: z.string(),
    schoolId: z.string(),
    userId: z.string(),
    gender: z.string().nullable(),
    telNumber: z.string().nullable(),
    address: z.string().nullable(),
    subjects: z.string().nullable(),
    dateOfBirth: z.string().nullable(),
    joiningDate: z.string().nullable(),
    status: z.string(),
    teacherPictureFileId: z.string().nullable(),
});

export const AuthUserInfoSchema = z.union([
    AuthUserInfoAdminSchema,
    AuthUserInfoTeacherSchema,
    AuthUserInfoStudentSchema,
]);

export const AuthUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    createdAt: z.string(), // or z.string().datetime() if ISO format
    updatedAt: z.string(), // same here
    info: AuthUserInfoSchema.optional(),
});



