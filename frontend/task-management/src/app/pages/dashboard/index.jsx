import Card from '../../components/Dashboard/Card'
import {ClipboardList, CheckCircle, Clock} from 'lucide-react'
import { useGetDashboardStatsQuery } from '../../store/api/taskApi'
import Error from '../../components/Error'
import Loading from '../../components/Loading'

export default function DashboardPage() {
    const { data, isLoading, error } = useGetDashboardStatsQuery()
    console.log(data)
    if (isLoading) return <Loading/>
    if (error) return <Error error="Failed to fetch dashboard stats" />
    const { total_tasks, total_completed_tasks, total_pending_tasks } = data
    return (
        <div className='p-4 w-full'>
            <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
            <Card title='Total Tasks' icon={ClipboardList} value={total_tasks} className={"text-blue-500"} />
            <Card title='Completed Tasks' icon={CheckCircle} value={total_completed_tasks} className={"text-green-500"} />
            <Card title='Pending Tasks' icon={Clock} value={total_pending_tasks} className={"text-yellow-500"} />
        </div>
    </div>
    )
}