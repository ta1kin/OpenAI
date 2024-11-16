import { createSlice } from '@reduxjs/toolkit'

import type { RecoveryPassState } from '@/types/redux/interfaces/recoveryPass'
type RecoveryPassState = typeof RecoveryPassState

const initialState: RecoveryPassState = {
    step: 0,
    code: '',
    maxStep: 3,
    isLoading: false
}

const recoveryPassSlice = createSlice({
    name: 'recoveryPass',
    initialState,
    reducers: {
        nextStep: state => {
            if ( state.step < state.maxStep ) {
                state.step++
            }
        },
        prevStep: state => {
            if (state.step > 0) {
                state.step--
            }
        },
        setCode: (state, action) => {
            state.code = action.payload
        },
        toggleLoading: state => {
            state.isLoading = !state.isLoading
        } 
    }
})

export const { nextStep, prevStep, setCode, toggleLoading } = recoveryPassSlice.actions
export default recoveryPassSlice.reducer