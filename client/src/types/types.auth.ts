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
    pass: string
}

export interface RecoveryStepProps {
    t: Function,
    stepPath: string
}
