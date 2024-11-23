import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import axios from 'axios'

import type { HomeState } from '@/types/redux/interfaces/home'

type HomeState = typeof HomeState

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const VITE_DELETE = import.meta.env.VITE_DELETE
const VITE_UPDATE_INFO = import.meta.env.VITE_UPDATE_INFO

const initialState: HomeState = {
    variant: 0,
    personalInfo: {
        nickName: '',
        fullName: '',
        phone: '',
    },
    delErr: false,
    isReset: false
}

export const updatePersonalInfo = createAsyncThunk(
    `${RouterPathes.Home}/update`,
    async ( data, _thunkAPI ) => {
        if( !SERVER_URL || !VITE_UPDATE_INFO ) throw new Error( 'Не заданы пути для изменения данных!' )
        
        // const response = await axios.put(
        //     `${SERVER_URL}/${VITE_UPDATE_INFO}`,
        //     {
        //         email: data.email,

        //     }
        // )

        // if( response.status !== 200 ) throw new Error( 'Ошибка при изменении данных!' )
        return data
    }
)

export const deleteAsync = createAsyncThunk(
    `${RouterPathes.Home}/delete`,
    async ( token, _thunkAPI ) => {
        if( !SERVER_URL || !VITE_DELETE ) throw new Error( 'Не заданы пути для удаления!' )
        
        const response = await axios.delete(
            `${SERVER_URL}/${VITE_DELETE}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if( response.status !== 200 ) throw new Error( 'Ошибка при удалении!' )
    }
)


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setVariant: (state, action) => {
            state.variant = action.payload
        },
        setPersonalInfo: (state, action) => {
            state.personalInfo = action.payload
        },
        // setNick: (state, action) => {
        //     state.personalInfo.nickName = action.payload
        // },
        // setFullName: (state, action) => {
        //     state.personalInfo.fullName = action.payload
        // },
        // setPhone: (state, action) => {
        //     state.personalInfo.phone = action.payload
        // },
        toggleReset: state => {
            state.isReset = !state.isReset
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePersonalInfo.pending, (state) => {
            state.delErr = false
        })
        builder.addCase(updatePersonalInfo.fulfilled, (state, _action) => {
            state.delErr = false
        })
        builder.addCase(updatePersonalInfo.rejected, (state) => {
            state.delErr = true
        })

        builder.addCase(deleteAsync.pending, (state) => {
            state.delErr = false
        })
        builder.addCase(deleteAsync.fulfilled, (state, _action) => {
            state.delErr = false
        })
        builder.addCase(deleteAsync.rejected, (state) => {
            state.delErr = true
        })
    }
})

export const { setVariant, setPersonalInfo, toggleReset } = homeSlice.actions
export default homeSlice.reducer
