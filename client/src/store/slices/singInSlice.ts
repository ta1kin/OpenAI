import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'

import type{ LoginData } from '@/types/types.auth'
import type { SingInState } from '@/types/redux/interfaces/singIn'

type SingInState = typeof SingInState
type LoginData = typeof LoginData

const initialState: SingInState = {
    step: 0,
    isLoading: false
}

export const loginAsync = createAsyncThunk(
    'sing-in/login',
    async ( data: LoginData, _thunkAPI ) => {
        console.log('Вход в систему')
        console.log('Email:', data.email)
        console.log('Password:', data.pass)

        return { success: true }
    }
);

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(loginAsync.rejected, (state) => {
            state.isLoading = false;
        });
    }
})

export const { nextStep, prevStep } = singInSlice.actions
export default singInSlice.reducer