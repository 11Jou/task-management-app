import { useState, useEffect, useRef } from 'react'
import Table from '../../../components/Dashboard/Table'
import Pagination from '../../../components/Pagination'
import SearchBar from '../../../components/Inputs/SearchBar'
import SelectOption from '../../../components/Inputs/SelectOption'
import ConfirmDialog from '../../../components/ConfirmDialog'
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
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const isAdjustingPage = useRef(false)

    const { data, isLoading, error } = useGetTasksQuery({
        page,
        page_size: pageSize,
        search,
        status,
    })

    useEffect(() => {
        if (isAdjustingPage.current) {
            isAdjustingPage.current = false
            return
        }
        if (error && error.status === 404 && page > 1) {
            isAdjustingPage.current = true
            setTimeout(() => setPage(1), 0)
            return
        }

        if (data && (!data.results || data.results.length === 0) && page > 1) {
            const totalPages = Math.ceil((data.count || 0) / pageSize)
            if (page > totalPages) {
                isAdjustingPage.current = true
                setTimeout(() => setPage(totalPages > 0 ? totalPages : 1), 0)
            }
        }
    }, [error, data, page, pageSize])

    if (isLoading) return <Loading/>
    if (error && error.status !== 404) return <Error error="Failed to fetch tasks" />

    const handleView = (row) => {
        navigate(`/dashboard/tasks/${row.id}`)
    }

    const handleEdit = (row) => {
        navigate(`/dashboard/tasks/${row.id}/edit`)
    }

    const handleDelete = (row) => {
        if(isDeleting) return toast.info('Deleting task...')
        setSelectedTask(row)
        setIsConfirmDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!selectedTask) return
        
        try {
            await deleteTask(selectedTask.id).unwrap()
            toast.success('Task deleted successfully')
            setIsConfirmDialogOpen(false)
            setSelectedTask(null)
            
            const currentPageItemCount = data?.results?.length || 0
            if (currentPageItemCount === 1 && page > 1) {
                setPage(page - 1)
            }
        } catch (error) {
            const errorMessage = error?.data?.message || error?.message || 'Failed to delete task'
            toast.error(errorMessage)
        }
    }

    const handleCancelDelete = () => {
        setIsConfirmDialogOpen(false)
        setSelectedTask(null)
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
        <div className='w-full'>
            <ToastContainer />
            <div className='flex flex-col sm:flex-row mb-4 gap-4 justify-between'>
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <SearchBar
                        placeholder="Search With Title or Description"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                    />
                    <SelectOption
                        placeholder="All Status"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value) 
                            setPage(1)
                        }}
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'in_progress', label: 'In Progress' },
                            { value: 'completed', label: 'Completed' }
                        ]}
                    />
                </div>
                <div className='flex sm:w-28'>
                    <button className='w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg text-sm sm:text-md cursor-pointer transition-colors' onClick={handleAddTask}>
                        Add Task
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table 
                    headers={headers} 
                    data={data?.results || []}
                    actions={{
                        onView: handleView,
                        onEdit: handleEdit,
                        onDelete: handleDelete,
                    }}
                />
            </div>
            {data && (
                <Pagination
                    currentPage={page}
                    pageSize={pageSize}
                    totalCount={data.count || 0}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title="Delete Task"
                message={`Are you sure you want to delete "${selectedTask?.title || 'this task'}"? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={isDeleting}
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                cancelButtonClass="bg-gray-300 hover:bg-gray-400"
            />
        </div>
    )
}