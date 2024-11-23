export interface UserDoc {
    headline: string
    mimeType: MimeDocType
    size: number
    data: Buffer
    date: Date
}

enum MimeDocType {
    Pdf = 'PDF'
}