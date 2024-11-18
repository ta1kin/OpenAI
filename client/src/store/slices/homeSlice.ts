import { createSlice } from '@reduxjs/toolkit'

import type { HomeState } from '@/types/redux/interfaces/home'

type HomeState = typeof HomeState


const initialState: HomeState = {}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {}
})

export default homeSlice.reducer