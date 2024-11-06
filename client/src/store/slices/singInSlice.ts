import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step: 0
}

const singInSlice = createSlice({
    name: 'singIn',
    initialState,
    reducers: {
        nextStep: state => {
            state.step++
        },
        prevStep: state => {
            if( state.step > 0 ) {
                state.step--
            }
        }
    }
})

export const { nextStep, prevStep } = singInSlice.actions
export default singInSlice.reducer