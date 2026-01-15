import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:8000/api'

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        headers.set('Content-Type', 'application/json')
        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    const isRefreshEndpoint = args?.url?.includes('/auth/refresh/')

    if (result?.error?.status === 401 && !isRefreshEndpoint) {
        const refreshToken = api.getState()?.auth?.refreshToken

        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: '/auth/refresh/',
                    method: 'POST',
                    body: { refresh: refreshToken },
                },
                api,
                extraOptions
            )

            if (refreshResult?.data) {
                const responseData = refreshResult.data.data || refreshResult.data
                const access = responseData.access
                const refresh = responseData.refresh || refreshToken

                if (access) {
                    api.dispatch({
                        type: 'auth/updateToken',
                        payload: { access, refresh },
                    })
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch({ type: 'auth/logout' })
                    if (typeof window !== 'undefined') {
                        window.location.href = '/'
                    }
                }
            } else {
                api.dispatch({ type: 'auth/logout' })
                if (typeof window !== 'undefined') {
                    window.location.href = '/'
                }
            }
        } else {
            api.dispatch({ type: 'auth/logout' })
            if (typeof window !== 'undefined') {
                window.location.href = '/'
            }
        }
    }

    return result
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth', 'Task', 'User'],
    endpoints: () => ({}), 
})
