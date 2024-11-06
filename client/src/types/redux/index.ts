import type { SettingsState } from "./setting"
import type { SingInState } from "./singIn"
import type { SingUpState } from "./singUp"


export interface State {
    settings: SettingsState,
    singIn: SingInState,
    singUp: SingUpState
}