interface HeaderRoutingItem{
   to: string,
   text: string
}

export interface HeaderRouting {
    [key: string]: HeaderRoutingItem
}

export interface UploadedFile {
    name: string
    type: string
}