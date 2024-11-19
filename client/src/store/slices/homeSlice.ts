import { createSlice } from '@reduxjs/toolkit'

import type { HomeState } from '@/types/redux/interfaces/home'

type HomeState = typeof HomeState


const initialState: HomeState = {
    variant: 0
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setVariant: (state, action) => {
            state.variant = action.payload
        }
    }
})

export const { setVariant } = homeSlice.actions
export default homeSlice.reducer