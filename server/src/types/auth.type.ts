export interface SingUpDataType {
    email: string
    password: string
}

export interface User {
    id: number
    email: string
    password?: string
    role: string
    isVerify?: boolean
}

export interface TokenVariant {
    [key: string]: { secret: string; time: string };
}