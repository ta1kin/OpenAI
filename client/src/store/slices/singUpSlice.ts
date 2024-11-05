import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step: 0
}

const singUpSlice = createSlice({
    name: 'singUp',
    initialState,
    reducers: {
        nextStep: state => {
            state.step++
        },
        prevStep: state => {
            if (state.step > 0) {
                state.step--
            }
        }
    }
})

export const { nextStep, prevStep } = singUpSlice.actions
export default singUpSlice.reducer