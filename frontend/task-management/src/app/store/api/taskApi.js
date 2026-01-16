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
        getTaskDetail: builder.query({
            query: (id) => `tasks/${id}/`,
            providesTags: ['Task'],
        }),
        createTask: builder.mutation({
            query: (taskData) => ({
                url: 'tasks/',
                method: 'POST',
                body: taskData,
            }),
            invalidatesTags: ['Tasks', 'Dashboard'],
        }),
        createMultipleTasks: builder.mutation({
            query: (tasksData) => ({
                url: 'tasks/bulk/',
                method: 'POST',
                body: tasksData,
            }),
            invalidatesTags: ['Tasks', "Dashboard"],
        }),
        createMultipleTasksFromExcel: builder.mutation({
            query: (file) => {
                const formData = new FormData()
                formData.append('file', file)
                return {
                    url: 'tasks/bulk/excel/',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Tasks', "Dashboard"],
        }),
        updateTask: builder.mutation({
            query: ({ id, ...taskData }) => ({
                url: `tasks/${id}/`,
                method: 'PUT',
                body: taskData,
            }),
            invalidatesTags: ['Tasks', 'Task', 'Dashboard'],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `tasks/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks', 'Dashboard'],
        }),
    }),
})

export const {
    useGetDashboardStatsQuery,
    useGetTasksQuery,
    useGetTaskDetailQuery,
    useCreateTaskMutation,
    useCreateMultipleTasksMutation,
    useCreateMultipleTasksFromExcelMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi
