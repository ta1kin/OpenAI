import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import type { RecoveryPassState } from '@/types/redux/interfaces/recoveryPass'


type RecoveryPassState = typeof RecoveryPassState

const initialState: RecoveryPassState = {
    step: 0,
    code: '',
    maxStep: 3,
    isLoading: false
}


export const verifyEmailAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/verify-email`,
    async ( data, _thunkAPI ) => {
        console.log('Верификация email в системе')
        console.log( data )

        return new Promise<void>((resolve) => {
            console.log('Начало задержки')
            
            setTimeout(() => {
                console.log('Задержка завершена')
                resolve();
            }, 10000);

            return { message: 'success' }
        })
    }
)

export const verifyCodeAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/verify-code`,
    async ( data, _thunkAPI ) => {
        console.log('Верификация code в системе')
        console.log( data )

        return new Promise<void>((resolve) => {
            console.log('Начало задержки')
            
            setTimeout(() => {
                console.log('Задержка завершена')
                resolve();
            }, 10000);

            return { message: 'success' }
        })
    }
)

export const sendNewPassAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/send-new-pass`,
    async ( data, _thunkAPI ) => {
        console.log('Смена пароля в системе')
        console.log( data )

        return new Promise<void>((resolve) => {
            console.log('Начало задержки')
            
            setTimeout(() => {
                console.log('Задержка завершена')
                resolve();
            }, 10000);

            return { message: 'success' }
        })
    }
)

const recoveryPassSlice = createSlice({
    name: 'recoveryPass',
    initialState,
    reducers: {
        nextStep: state => {
            if ( state.step < state.maxStep ) {
                state.step++
            }
        },
        prevStep: state => {
            if (state.step > 0) {
                state.step--
            }
        },
        setCode: (state, action) => {
            state.code = action.payload
        },
        toggleLoading: state => {
            state.isLoading = !state.isLoading
        } 
    },
    extraReducers: (builder) => {
        // verifyEmailAsync
        builder.addCase(verifyEmailAsync.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(verifyEmailAsync.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(verifyEmailAsync.rejected, (state) => {
            state.isLoading = false;
        })

        // verifyCodeAsync
        builder.addCase(verifyCodeAsync.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(verifyCodeAsync.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(verifyCodeAsync.rejected, (state) => {
            state.isLoading = false;
        })

        // sendNewPassAsync
        builder.addCase(sendNewPassAsync.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(sendNewPassAsync.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(sendNewPassAsync.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export const { nextStep, prevStep, setCode, toggleLoading } = recoveryPassSlice.actions
export default recoveryPassSlice.reducer