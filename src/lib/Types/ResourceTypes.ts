// Maafa Types

export type Resource = {
    id: number
    fileName: string
    type: string
    dateAdded: string
    size: string
}

export type ResourceSortOption = 'newest' | 'oldest' | 'name' | 'size'

export type ResourceApiModel = Resource & {
    collectionId?: string | number
}

// Benali Types

export type ResourceCard = {
    id: string
    type: string
    title: string
    subject: string
    content: string
    time: string
    read?: boolean
}
