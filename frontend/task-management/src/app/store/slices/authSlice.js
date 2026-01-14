import { createSlice } from '@reduxjs/toolkit'

const getInitialState = () => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    const user = localStorage.getItem('user')

    return {
        token: token || null,
        refreshToken: refreshToken || null,
        user: user ? JSON.parse(user) : null,
        isAuthenticated: !!token,
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setCredentials: (state, action) => {
            const { access, refresh, email, name } = action.payload
            state.token = access
            state.refreshToken = refresh
            state.user = { email, name }
            state.isAuthenticated = true

            localStorage.setItem('token', access)
            localStorage.setItem('refreshToken', refresh)
            localStorage.setItem('user', JSON.stringify({ email, name }))
        },
        logout: (state) => {
            state.token = null
            state.refreshToken = null
            state.user = null
            state.isAuthenticated = false

            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
        },
        updateToken: (state, action) => {
            state.token = action.payload.access
            if (action.payload.refresh) {
                state.refreshToken = action.payload.refresh
                localStorage.setItem('refreshToken', action.payload.refresh)
            }
            localStorage.setItem('token', action.payload.access)
        },
    },
})

export const { setCredentials, logout, updateToken } = authSlice.actions
export default authSlice.reducer
