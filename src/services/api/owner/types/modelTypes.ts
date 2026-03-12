import { z } from "zod";

export interface StudentModel {
    id: string;
    name: string;
    email: string;
    grade: string;
    parentPhoneNumber: string;
    parentName: string;
    status: string;
    imgSrc?: string;
    gender?: string;
    address?: string;
    dateOfBirth?: Date;
    enrollmentDate?: Date;
}

export const StudentSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    grade: z.string(),
    parentPhoneNumber: z.string(),
    parentName: z.string(),
    status: z.string(),
    imgSrc: z.string().optional(),
    gender: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.date().optional(),
    enrollmentDate: z.date().optional(),
});


export interface TeacherModel {
    number: string;
    id: string;
    gender: "male" | "female";
    name: string;
    email: string;
    password: string;
    address: string;
    subjects: Array<string>;
    departement: string;
    dateOfBirth: Date;
    joiningDate: Date;
    imgSrc?: string | undefined;
    status?: "Active" | "Inactive" | "pending" | "new" | undefined;
    role?: "admin" | "teacher" | "student" | undefined;
}

export const TeacherSchema = z.object({
    number: z.string(),
    id: z.string(),
    gender: z.enum(["male", "female"]),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    address: z.string(),
    subjects: z.array(z.string()),
    departement: z.string(),
    dateOfBirth: z.date(),
    joiningDate: z.date(),
    imgSrc: z.string().optional(),
    status: z.enum(["Active", "Inactive", "pending", "new"]).optional(),
    role: z.enum(["admin", "teacher", "student"]).optional(),
});
