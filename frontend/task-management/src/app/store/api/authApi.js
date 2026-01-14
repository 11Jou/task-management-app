import { api } from '../api'

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register/',
                method: 'POST',
                body: userData,
            }),
        }),
        refreshToken: builder.mutation({
            query: (refresh) => ({
                url: '/auth/refresh/',
                method: 'POST',
                body: { refresh },
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
} = authApi
