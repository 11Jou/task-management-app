import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define the base URL for your API
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create base API with RTK Query
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Auth', 'Task', 'User'],
    endpoints: () => ({}), // Endpoints will be injected
})
