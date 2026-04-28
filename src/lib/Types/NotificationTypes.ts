import type { TypeTabFilterS } from "./FilterTypes"
import type { ResourceCard } from "./ResourceTypes"

// Maafa Types

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

export type NotificationAttachment = {
    href: string
    label: string
    extension: string
    kind: 'image' | 'video' | 'document'
}

export type Not = Array<{
    id: number
    type: string
    title: string
    message: string
    time: string
}>

export type AddTeacherNotificationPayload = {
    role: 'teacher' | 'admin'
    subject: string
    content: string
    attachments?: FileList | Array<File>
    onUploadProgress?: (progress: number) => void
    sendTo?: Array<string>
    type: 'Teacher' | 'Urgent' | 'Administrative' | 'User' | 'Grade' | 'Book'
}

// Benali Types

export type NotificationsProps = {
    initialTab?: TypeTabFilterS
}

export type NotificationListProps = {
    tab?: TypeTabFilterS
    searchText?: string
    role?: 'student' | 'teacher'
    data?: Array<ResourceCard>
    isLoading?: boolean
    error?: any
    detailTo?: string
}
