import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'
import { SERVER_URL, VITE_LOAD_DOCS } from '@/config/api.config'

import axios from 'axios'

import type { DocsState, LoadData, FileListItem } from '@/types/redux/interfaces/docs'

type DocsState = typeof DocsState
type LoadData = typeof LoadData
type FileListItem= typeof FileListItem


const initialState: DocsState = {
    fileList: [],
    select: '',
    search: '',
    targetId: null,
    isLoading: false,
}

export const getDocAsync = createAsyncThunk(
    `${RouterPathes.Docs}/get-doc`,
    async ( data: LoadData, _thunkAPI ) => {
        
        const response = await axios.get(
            `${SERVER_URL}/${VITE_LOAD_DOCS}/${data.bookId}`,
            {
                headers: {
                    'Authorization': `Bearer ${ data.accessToken }`,
                }
            }
        )

        if( response.status !== 200 ) throw new Error( 'Ошибка при получении файла!' )

        return response.data.data
    }
)

export const loadDocsAsync = createAsyncThunk(
    `${RouterPathes.Docs}/load-docs`,
    async ( data: LoadData, _thunkAPI ) => {
        
        const response = await axios.post(
            `${SERVER_URL}/${VITE_LOAD_DOCS}`,
            {
                files: data.files
            },
            {
                headers: {
                    'Authorization': `Bearer ${ data.accessToken }`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        if( response.status !== 200 ) throw new Error( 'Ошибка при загрузке файлов!' )

        const idList = response.data.resData

        const newFileList: FileListItem[] = []
        const now = new Date()

        data.files.forEach( (file: File, index: number) => {
            const newFile = {
                id: idList[index].id,
                headline: file.name,
                date: Number( now.getTime() ),
                formatDate: idList[index].formatDate,
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
        resetDocs: state => {
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

export const { setSelect, setSearch, setFileList, resetDocs } = docsSlice.actions
export default docsSlice.reducer
