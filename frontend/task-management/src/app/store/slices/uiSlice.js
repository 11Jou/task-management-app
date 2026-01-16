import { createSlice } from '@reduxjs/toolkit'

const getInitialSidebarState = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        return true 
    }
    return false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        sidebarOpen: getInitialSidebarState(),
        theme: 'light',
        loading: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

export const {
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setLoading,
} = uiSlice.actions

export default uiSlice.reducer
