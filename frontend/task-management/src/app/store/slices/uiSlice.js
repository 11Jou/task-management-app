import { createSlice } from '@reduxjs/toolkit'

// Initialize sidebar as closed (will be closed on mobile by default)
const getInitialSidebarState = () => {
    // Check if we're on a desktop device (window width >= 768px)
    // Default to closed for mobile-first approach
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        return true // Open on desktop
    }
    return false // Closed on mobile by default
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        sidebarOpen: getInitialSidebarState(),
        theme: 'light', // 'light' or 'dark'
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
            // Persist theme to localStorage
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
