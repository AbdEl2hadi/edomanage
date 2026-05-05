import type z from "zod";
import type { AuthUserInfoAdminSchema, AuthUserInfoSchema, AuthUserInfoStudentSchema, AuthUserInfoTeacherSchema, AuthUserSchema } from "../Schemas/UserSchemas";

// export type User = z.infer<typeof userSchema>

// export type NewUser = z.infer<typeof newUserSchema>

export type AuthUserInfoAdmin = z.infer<typeof AuthUserInfoAdminSchema>;

export type AuthUserInfoTeacher = z.infer<typeof AuthUserInfoTeacherSchema>;

export type AuthUserInfoStudent = z.infer<typeof AuthUserInfoStudentSchema>;

export type AuthUserInfo = z.infer<typeof AuthUserInfoSchema>;

export type AuthUser = z.infer<typeof AuthUserSchema>;

