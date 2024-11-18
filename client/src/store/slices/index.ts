import settingsReducer from './settingsSlice'
import singInReducer from './singInSlice'
import singUpReducer from './singUpSlice'
import errorReducer from './errorSlice'
import authReducer from './authSlice'
import recoveryPassReducer from './recoveryPassSlice'
import homeReducer from './homeSlice'
import docsReducer from './docsSlice'
import bookReducer from './bookSlice'

import type { State } from '@/types/redux'

type State = typeof State


export default {
    settings: settingsReducer,
    singIn: singInReducer,
    singUp: singUpReducer,
    error: errorReducer,
    auth: authReducer,
    recoveryPass: recoveryPassReducer,
    home: homeReducer,
    docs: docsReducer,
    book: bookReducer,
} as State