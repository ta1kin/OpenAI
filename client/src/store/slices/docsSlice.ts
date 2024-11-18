import { createSlice } from '@reduxjs/toolkit'

import type { DocsState } from '@/types/redux/interfaces/docs'

type DocsState = typeof DocsState


const initialState: DocsState = {}

const docsSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {}
})

export default docsSlice.reducer