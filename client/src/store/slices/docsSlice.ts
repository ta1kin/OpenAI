import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'
import { formatedDate } from '@/service/service.time'

import axios from 'axios'

import type { DocsState, LoadData, DocsFile } from '@/types/redux/interfaces/docs'

type DocsState = typeof DocsState
type LoadData = typeof LoadData
type DocsFile = typeof DocsFile


const SERVER_URL = import.meta.env.VITE_SERVER_URL
const VITE_LOAD = import.meta.env.VITE_LOAD

const initialState: DocsState = {
    fileList: [],
    select: '',
    search: '',
    isLoading: false
}

export const loadDocsAsync = createAsyncThunk(
    `${RouterPathes.Docs}/load-docs`,
    async ( data: LoadData, _thunkAPI ) => {
        // if( !SERVER_URL || !VITE_LOAD ) throw new Error( 'Не заданы пути для загрузки файлов!' )
        
        // const response = await axios.put(
        //     `${SERVER_URL}/${VITE_LOAD}`,
        //     {
        //         data,
        //         headers: {
        //             'Content-Type': '',
        //             'Authorization': `Bearer ${ data.token }`,
        //         }
        //     }
        // )

        // if( response.status !== 200 ) throw new Error( 'Ошибка при загрузке файлов!' )

        const newFileList: DocsFile = []
        const now = new Date()

        data.files.forEach( (file: File, index: number) => {
            const newFile = {
                id: index,
                headline: file.name,
                date: now.getTime(),
                formatDate: formatedDate( now ),
            }
            newFileList.push( newFile )
        })

        return newFileList
    }
)

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
    },
    extraReducers: (builder) => {
        builder.addCase(loadDocsAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loadDocsAsync.fulfilled, (state, action) => {
            state.fileList = [ ...state.fileList, ...action.payload ]
            state.isLoading = false
        })
        builder.addCase(loadDocsAsync.rejected, (state) => {
            state.isLoading = true
        })
    }
})

export const { setSelect, setSearch, setFileList, resetData } = docsSlice.actions
export default docsSlice.reducer
