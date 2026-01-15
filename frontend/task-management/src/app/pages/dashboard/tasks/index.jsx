import { useState } from 'react'
import Table from '../../../components/Dashboard/Table'
import Pagination from '../../../components/Pagination'
import SearchBar from '../../../components/SearchBar'
import SelectOption from '../../../components/SelectOption'
import { useGetTasksQuery , useDeleteTaskMutation } from '../../../store/api/taskApi'
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

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

    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation()

    const { data, isLoading, error } = useGetTasksQuery({
        page,
        page_size: pageSize,
        search,
        status,
    })

    if (isLoading) return <Loading/>
    if (error) return <Error error="Failed to fetch tasks" />

    const handleView = (row) => {
        navigate(`/dashboard/tasks/${row.id}`)
    }

    const handleEdit = (row) => {
        console.log('Edit task:', row)
    }

    const handleDelete = async (row) => {
        if(isDeleting) return toast.info('Deleting task...')
        if(window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(row.id)
                toast.success('Task deleted successfully')
            } catch (error) {
                toast.error('Failed to delete task' , error.message)
            }
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize)
        setPage(1) 
    }

    const handleAddTask = () => {
        navigate('/dashboard/tasks/create')
    }

    return (
        <div className='p-2 w-full'>
            <ToastContainer />
            <div className='flex mb-4 justify-between'>
            <div className="flex gap-4">
                <SearchBar
                    placeholder="Search With Title or Description"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(1)
                    }}
                />
                <SelectOption
                    placeholder="Select Status"
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value) 
                        setPage(1)
                    }}
                    options={['pending', 'completed']}
                />
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