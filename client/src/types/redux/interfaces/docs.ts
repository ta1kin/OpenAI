export interface DocsItem {
    id: number
    headline: string
    date: Date
}

export interface DocsState {
    itemsList: DocsItem[] | []
    fileList: File[] | []
    select: string
    search: string
    isLoading: boolean
}
