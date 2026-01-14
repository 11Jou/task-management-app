import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        sidebarOpen: false,
        theme: 'light', // 'light' or 'dark'
        loading: false,
        notifications: [],
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
        addNotification: (state, action) => {
            state.notifications.push({
                id: Date.now(),
                ...action.payload,
            })
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            )
        },
        clearNotifications: (state) => {
            state.notifications = []
        },
    },
})

export const {
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications,
} = uiSlice.actions

export default uiSlice.reducer
