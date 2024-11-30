import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'
import { SERVER_URL, SING_IN } from '@/config/api.config'

import axios from 'axios'

import type{ LoginData } from '@/types/types.auth'
import type { SingInState } from '@/types/redux/interfaces/singIn'

type SingInState = typeof SingInState
type LoginData = typeof LoginData


const initialState: SingInState = {
    step: 0,
    isClicked: false,
    isLoading: false,
    isValid: true,
}

export const loginAsync = createAsyncThunk(
    `${RouterPathes.Login}/login`,
    async ( data: LoginData, _thunkAPI ) => {

        const response = await axios.post(
            `${SERVER_URL}/${SING_IN}`,
            data
        )

        if( response.status !== 201 ) throw new Error( 'Ошибка при попытки входа!' )

        return response.data
    }
)

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
        },
        onIsClicked: state => {
           state.isClicked = true 
        },
        resetValid: state => {
            state.isValid = true 
        },
        resetSingInState: state => {
            state.step = 0
            state.isClicked = false
            state.isLoading = false
            state.isValid = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginAsync.fulfilled, (state, _action) => {
            state.isLoading = false
            state.isClicked = false
        })
        builder.addCase(loginAsync.rejected, (state) => {
            state.isLoading = false
            state.isValid = false
        })
    }
})

export const { nextStep, prevStep, onIsClicked, resetValid, resetSingInState } = singInSlice.actions
export default singInSlice.reducer