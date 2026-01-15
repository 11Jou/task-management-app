import { useParams } from 'react-router-dom'
import { useGetTaskDetailQuery } from '../../../../store/api/taskApi'
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'
import DetailRow from '../../../../components/Dashboard/DetailRow'
import formatDate from '../../../../helpers/formatDate'

export default function TaskDetailPage() {
    const { id } = useParams()
    const { data, isLoading, error } = useGetTaskDetailQuery(id)

    if (isLoading) return <Loading />
    if (error) return <Error error="Failed to fetch task" />

    return (
        <div className="p-4 w-full flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Task Details
                    </h1>
                </div>

                <div className="space-y-4">
                    <DetailRow label="Title" value={data.title} />
                    <DetailRow label="Description" value={data.description} />
                    <DetailRow label="Status" value={data.status} badge />
                    <DetailRow label="Created At" value={formatDate(data.created_at)} />
                    <DetailRow label="Updated At" value={formatDate(data.updated_at)} />
                </div>
            </div>
        </div>
    )
}
