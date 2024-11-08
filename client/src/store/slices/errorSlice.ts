import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    text: ''
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        resetText: state => {
            state.text = ''
        }
    }
})

export const { resetText } = errorSlice.actions
export default errorSlice.reducer