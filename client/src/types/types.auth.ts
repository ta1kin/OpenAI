import type { WhoIsObject } from './redux/interfaces/auth'


export interface HeaderProps {
    i18nPath: string,
    baseHeaderPath: string,
    step?: number
}

export interface BodyProps {
    i18nPath: string,
    baseBodyPath: string,
    step?: number
}

export interface BtnsProps {
    i18nPath: string,
    baseBtnsPath: string,
    step?: number
}

export interface LoginData {
    email: string,
    password: string,
    saveMe: boolean,
}

export interface RegisterData {
    profession: string,
    whoIs: WhoIsObject,
    email: string,
    password: string,
    saveMe: boolean,
}

export interface RecoveryStepProps {
    t: Function,
    stepPath: string
}
