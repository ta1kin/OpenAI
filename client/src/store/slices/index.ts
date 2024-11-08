import settingsReducer from './settingsSlice'
import singInReducer from './singInSlice'
import singUpReducer from './singUpSlice'
import errorReducer from './errorSlice'
import authReducer from './authSlice'
import recoveryPassReducer from './recoveryPassSlice'


export default {
    settings: settingsReducer,
    singIn: singInReducer,
    singUp: singUpReducer,
    error: errorReducer,
    auth: authReducer,
    recoveryPass: recoveryPassReducer
}