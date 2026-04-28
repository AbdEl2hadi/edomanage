export type Resource = {
  id: number
  fileName: string
  type: string
  dateAdded: string
  size: string
}

export type ResourceSortOption = 'newest' | 'oldest' | 'name' | 'size'

export type NotificationAttachment = {
  href: string
  label: string
  extension: string
  kind: 'image' | 'video' | 'document'
}

export type Notification = {
  id: string
  type: 'Urgent' | 'Teacher' | 'Administrative' | 'User' | 'Grade' | 'Book'
  title: string
  content?: string
  subject: string
  sendTo?: Array<'Students' | 'Teachers'>
  attachments?: Array<NotificationAttachment>
  time: string
}

export type Collection = {
  id: string
  name: string
  filesCount: number
  createdAt: string
  updatedAt: string
  sizeMB: number
}

export type ResourceApiModel = Resource & {
  collectionId?: string | number
}

export type Not = Array<{
  id: number
  type: string
  title: string
  message: string
  time: string
}>

// export type StudentUser = {
//     id: string;
//     userId: string;
//     schoolId: string;
//     grade: string;
//     classe: string;
//     parentPhoneNumber: string;
//     parentName: string;
//     status: "Active" | "Inactive" | "Pending" | "New";
//     gender: "Male" | "Female";
//     address: string;
//     dateOfBirth: string;
//     email: string;
//     emailVerified: boolean;
//     image: string | null;
//     name: string;
//     telNumber: string | null;
//     role: "Student" | "Teacher" | "Admin";
//     createdAt: Date;
//     updatedAt: Date;
// }