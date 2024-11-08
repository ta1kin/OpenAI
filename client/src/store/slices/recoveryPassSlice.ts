import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step: 0,
    maxStep: 2
}

const recoveryPassSlice = createSlice({
    name: 'recoveryPass',
    initialState,
    reducers: {
        nextStep: state => {
            if ( state.step < state.maxStep ) {
                state.step = state.step + 1
            }
        },
        prevStep: state => {
            if (state.step > 0) {
                state.step--
            }
        }
    }
})

export const { nextStep, prevStep } = recoveryPassSlice.actions
export default recoveryPassSlice.reducer