import type { SettingsState } from "./interfaces/setting"
import type { SingInState } from "./interfaces/singIn"
import type { SingUpState } from "./interfaces/singUp"
import type { ErrorState } from "./interfaces/error"
import type { AuthState } from "./interfaces/auth"
import type { RecoveryPassState } from "./interfaces/recoveryPass"


export interface State {
    settings: SettingsState,
    singIn: SingInState,
    singUp: SingUpState,
    error: ErrorState,
    auth: AuthState,
    recoveryPass: RecoveryPassState
}
