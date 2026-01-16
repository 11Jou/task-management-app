import { api } from '../api'

export const reportApi = api.injectEndpoints({
    endpoints: (builder) => ({
        exportTasks: builder.mutation({
        query: ({ from_date, to_date, status }) => {
            const params = new URLSearchParams()
            if (from_date) params.append('from', from_date)
            if (to_date) params.append('to', to_date)
            if (status) params.append('status', status)

            return {
                url: `tasks/export/?${params.toString()}`,
                method: 'GET',
                responseHandler: async (response) => {
                    if (!response.ok) {
                        throw new Error('Failed to export tasks')
                    }
                    return await response.blob()
                },
            }
        },
    }),
})
})

export const { useExportTasksMutation } = reportApi