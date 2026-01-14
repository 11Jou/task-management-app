import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import './api/authApi' // Import to register endpoints

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

