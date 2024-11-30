import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'
import { SERVER_URL, SING_UP } from '@/config/api.config'

import axios from 'axios'

import type{ RegisterData } from '@/types/types.auth'
import type { SingUpState } from '@/types/redux/interfaces/singUp'


type SingUpState = typeof SingUpState
type RegisterData = typeof RegisterData


const initialState: SingUpState = {
    step: 0,
    maxStep: 3,
    isClicked: false,
    isLoading: false,
    isValid: true,
}

export const registerAsync = createAsyncThunk(
    `${RouterPathes.Register}/register`,
    async ( data: RegisterData, _thunkAPI ) => {
        
        const response = await axios.post(
            `${SERVER_URL}/${SING_UP}`,
            data
        )

        if( response.status !== 200 ) throw new Error( 'Ошибка при регистрации!' )

        return response.data.data
    }
)

const singUpSlice = createSlice({
    name: 'singUp',
    initialState,
    reducers: {
        nextStep: (state: SingUpState) => {
            if ( state.step < state.maxStep ) {
                state.step = state.step + 1
                state.isClicked = false
            }
        },
        prevStep: (state: SingUpState) => {
            if (state.step > 0) {
                state.step--
            }
        },
        onIsClicked: (state: SingUpState) => {
            state.isClicked = true 
        },
        resetStep: (state: SingUpState) => {
            state.isValid = true
            state.step = 0
        },
        resetSingUpState: state => {
            state.step = 0
            state.maxStep = 3
            state.isClicked = false
            state.isLoading = false
            state.isValid = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAsync.pending, (state) => {
            state.isLoading = true
            state.isValid = true
        })
        builder.addCase(registerAsync.fulfilled, (state, _action) => {
            state.isValid = true
            state.isLoading = false
            state.isClicked = false
        })
        builder.addCase(registerAsync.rejected, (state) => {
            state.isLoading = false
            state.isValid = false
        })
    }
})

export const { nextStep, prevStep, onIsClicked, resetStep, resetSingUpState } = singUpSlice.actions
export default singUpSlice.reducer