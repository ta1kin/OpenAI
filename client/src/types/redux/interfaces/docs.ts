export interface DocsFile {
    id: number
    headline: string
    date: Date
    formatDate: string
}

export interface DocsState {
    fileList: DocsFile[] | []
    select: string
    search: string
    isLoading: boolean
}

export interface LoadData {
    token: string
    files: File[]
}