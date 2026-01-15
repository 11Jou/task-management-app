import { api } from '../api'

export const taskApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => 'tasks/dashboard/',
            providesTags: ['Dashboard'],
        }),
        getTasks: builder.query({
            query: ({ page = 1, page_size = 10, search = '', status = '' }) =>
                `tasks/?page=${page}&page_size=${page_size}&search=${search}&status=${status}`,
            providesTags: ['Tasks'],
        }),
    }),
})

export const {
    useGetDashboardStatsQuery,
    useGetTasksQuery,
} = taskApi
