export interface FileListItem {
    id: number
    headline: string
    date: number
    formatDate: string
}

export interface DocsState {
    fileList: FileListItem[] | []
    select: string
    search: string
    targetId: number | null
    isLoading: boolean
}

export interface LoadData {
    accessToken: string
    files: File[]
}

export interface GetPayloadItem {
    id: number
    name: string
    date: number
    createdAt: Date
}