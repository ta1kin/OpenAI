import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    theme: 'light',
    lng: 'ru'
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: state => {
            state.theme =  state.theme === 'light' ? 'dark' : 'light'
        },
        toggleLang: state => {
            state.lng = state.lng === 'ru' ? 'en' : 'ru'
        }
    }
})

export const { toggleTheme, toggleLang } = settingsSlice.actions
export default settingsSlice.reducer