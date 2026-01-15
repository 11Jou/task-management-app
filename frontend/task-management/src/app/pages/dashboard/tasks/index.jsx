import { useState } from 'react'
import Table from '../../../components/Dashboard/Table'
import Pagination from '../../../components/Pagination'
import { useGetTasksQuery } from '../../../store/api/taskApi'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'
import { useNavigate } from 'react-router-dom'

const headers = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Created At' },
]

export default function TasksPage() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')

    const { data, isLoading, error } = useGetTasksQuery({
        page,
        page_size: pageSize,
        search,
        status,
    })

    if (isLoading) return <Loading/>
    if (error) return <Error error="Failed to fetch tasks" />

    const handleView = (row) => {
        console.log('View task:', row)
    }

    const handleEdit = (row) => {
        console.log('Edit task:', row)
    }

    const handleDelete = (row) => {
        console.log('Delete task:', row)
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize)
        setPage(1) // Reset to first page when page size changes
    }

    const handleAddTask = () => {
        navigate('/dashboard/tasks/create')
    }

    return (
        <div className='p-2 w-full'>
            <div className='flex mb-4 justify-between'>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Search With Title or Description"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(1)
                    }}
                    className="px-4 py-2 w-68 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
                <select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value)
                        setPage(1)
                    }}
                    className="px-2 py-2 w-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className='flex w-28'>
                <button className='w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-2 rounded-lg text-md' onClick={handleAddTask}>
                    Add Task
                </button>
            </div>
        </div>

            <Table 
                headers={headers} 
                data={data?.results || []}
                actions={{
                    onView: handleView,
                    onEdit: handleEdit,
                    onDelete: handleDelete,
                }}
            />
            {data && (
                <Pagination
                    currentPage={page}
                    pageSize={pageSize}
                    totalCount={data.count || 0}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}
        </div>
    )
}