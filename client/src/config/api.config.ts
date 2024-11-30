export const SERVER_URL       = import.meta.env.VITE_SERVER_URL
export const SING_IN          = import.meta.env.VITE_SING_IN
export const SING_UP          = import.meta.env.VITE_SING_UP
export const VERIFY_EMAIL     = import.meta.env.VITE_VERIFY_EMAIL
export const VERIFY_CODE      = import.meta.env.VITE_VERIFY_CODE
export const RECOVERY_PASS    = import.meta.env.VITE_RECOVERY_PASS
export const VITE_DELETE      = import.meta.env.VITE_DELETE
export const VITE_UPDATE_INFO = import.meta.env.VITE_UPDATE_INFO
export const VITE_LOAD_DOCS   = import.meta.env.VITE_LOAD_DOCS
export const VITE_GET_DOC     = import.meta.env.VITE_GET_DOC


if (
    !SERVER_URL       ||
    !SING_IN          ||
    !SING_UP          ||
    !RECOVERY_PASS    ||
    !VITE_DELETE      ||
    !VITE_UPDATE_INFO ||
    !VITE_LOAD_DOCS   ||
    !VITE_GET_DOC
) {
    throw new Error( 'Don`t have a vite env!' )
}