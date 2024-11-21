import { createSlice } from '@reduxjs/toolkit'

import type { DocsState } from '@/types/redux/interfaces/docs'

type DocsState = typeof DocsState


const initialState: DocsState = {
    itemsList: [
        {
            id: 0,
            headline: 'Гуливер в стране лилипутов',
            date: '12.12.2022'
        },
        {
            id: 1,
            headline: 'Гуливер в стране лилипутов',
            date: '12.12.2022'
        },
    ],
    fileList: [],
    select: '',
    search: '',
    isLoading: false
}

const docsSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {
        setSelect: (state, action) => {
            state.select = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setFileList: (state, action) => {
            state.fileList = action.payload
        },
        resetData: state => {
            state.itemsList = []
            state.select = ''
            state.search = ''
            state.isLoading = false
        }
    }
})

export const { setSelect, setSearch, setFileList, resetData } = docsSlice.actions
export default docsSlice.reducer