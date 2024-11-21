export interface PersonalInfoType {
    nickName: string
    fullName: string
    phone: string
}

export interface HomeState {
    variant: number
    personalInfo: PersonalInfoType
}