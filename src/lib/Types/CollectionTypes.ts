
export type Collection = {
    id: string
    name: string
    filesCount: number
    createdAt: string
    updatedAt: string
    sizeMB: number
}

export type AddOrEditCollectionPayload = {
    name: string
    role: 'add' | 'edit'
    id?: string
}