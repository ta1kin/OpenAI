interface WhoIsObject {
    first: boolean,
    second: boolean,
    third: boolean,
}

export interface AuthState {
    profession: string,
    whoIs: WhoIsObject,
    email: string,
    password: string,
    saveMe: boolean,
    accessToken: string,
    isValid: boolean,
}