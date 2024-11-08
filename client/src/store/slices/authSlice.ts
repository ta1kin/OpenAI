import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: 'Fallen-Angel@ya.ru',
    password: '',
    accessToken: '',
    isValid: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export default authSlice.reducer