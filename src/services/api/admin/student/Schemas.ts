import { z } from "zod"



// // You can replace these arrays with your actual Drizzle enum values
// const StatusEnum = z.enum(["New", "Active", "Inactive"]);
// const GenderEnum = z.enum(["Male", "Female"]);

// export const StudentModelSchema = z.object({
//     id: z.string().uuid(),
//     schoolId: z.string().uuid(),
//     userId: z.string(),
//     grade: z.string().max(20),
//     classe: z.string().max(40),
//     parentPhoneNumber: z.string().max(20),
//     parentName: z.string().max(120),
//     status: StatusEnum.default("New"),
//     gender: GenderEnum,
//     address: z.string(),
//     dateOfBirth: z.string().max(20),
//     email: z.string().email().max(255),
//     image: z.string().nullable().optional(),
//     username: z.string().max(50),
//     telNumber: z.string().max(20),
//     role: z.literal("student"),
//     createdAt: z.union([z.date(), z.string()]),
//     updatedAt: z.union([z.date(), z.string()]),
// });

// export type StudentModel = z.infer<typeof StudentModelSchema>;


// export const EditStudentModelSchema = StudentModelSchema.omit({ id: true, userId: true, schoolId: true, createdAt: true, updatedAt: true }).extend({
//     grade: z.string().max(20),
//     classe: z.string().max(40),
//     parentPhoneNumber: z.string().max(20),
//     parentName: z.string().max(120),
//     status: StatusEnum.optional(),
// }



// export const StudentSchema = z.object({
//     id: z.string(),
//     name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(20, { message: 'Name must be at most 20 characters' }),
//     email: z.string().email({ message: 'Invalid email address' }).nonempty({ message: 'Email is required' }),
//     grade: z.string().nonempty({ message: 'Grade is required' }),
//     classe: z.string().nonempty({ message: 'Classe is required' }),
//     parentPhoneNumber: z.string().min(8, { message: 'Parent phone number is too short' }).max(15, { message: 'Parent phone number is too long' }),
//     parentName: z.string().nonempty({ message: 'Parent name is required' }),
//     status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
//     imgSrc: z.string().optional(),
//     gender: z.enum(['Male', 'Female']),
//     address: z.string(),
//     dateOfBirth: z.string().nonempty(),
//     // enrollmentDate: z.string().nonempty(),
// })


// User schema and User type

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

export type User = z.infer<typeof userSchema>

// StudentModel schema and StudentSchema

export const studentSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    schoolId: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
    grade: z.string().nullable().optional(),
    classe: z.string().nullable().optional(),
    parentPhoneNumber: z.string().nullable().optional(),
    parentName: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    studentPictureFileId: z.string().nullable().optional(),
});

export type StudentModel = z.infer<typeof studentSchema>

// Student With User type

export const studentWithUserSchema = studentSchema.extend({
    user: userSchema,
});

export type StudentWithUser = z.infer<typeof studentWithUserSchema>


// StudentWithUser schema







// NewUser schema
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

export type NewUser = z.infer<typeof newUserSchema>


// AddStudentModel schema
export const addStudentSchema = z.object({
    schoolId: z.string(),
    id: z.string().optional(),
    userId: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending", "New"]).optional(),
    grade: z.string().nullable().optional(),
    classe: z.string().nullable().optional(),
    parentPhoneNumber: z.string().nullable().optional(),
    parentName: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    studentPictureFileId: z.string().nullable().optional(),
});

export type AddStudentModel = z.infer<typeof addStudentSchema>



// AddStudentWithUser schema
export const addStudentWithUserSchema = addStudentSchema.extend({
    user: newUserSchema,
});


export type AddStudentWithUser = z.infer<typeof addStudentWithUserSchema>













// export type StudentModel = {
//     status: "Active" | "Inactive" | "Pending" | "New";
//     gender: "Male" | "Female";
//     id: string;
//     userId: string;
//     schoolId: string;
//     name: string;
//     grade: string;
//     classe: string;
//     parentPhoneNumber: string;
//     parentName: string;
//     address: string;
//     dateOfBirth: string;
//     email: string
//     imgSrc?: string
// }

// export type UserModel = {
//     role: "Student" | "Teacher" | "Admin";
//     id: string;
//     email: string;
//     emailVerified: boolean;
//     image: string;
//     passwordHash: string;
//     username: string;
//     telNumber: string;
//     createdAt: Date;
//     updatedAt: Date;
//     gender: "Male" | "Female"
// }



// edit student type and schema
// export const EditStudentSchema = StudentSchema
// export type EditStudentModel = z.infer<typeof EditStudentSchema>


// // add student type and schema
// export const AddStudentSchema = StudentSchema.omit({ id: true, status: true }).extend({ schoolId: z.string(), telNumber: z.string() })
// export type AddStudentModel = z.infer<typeof AddStudentSchema>




