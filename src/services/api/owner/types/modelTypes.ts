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