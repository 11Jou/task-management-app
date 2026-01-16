import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTaskDetailQuery, useUpdateTaskMutation } from '../../../../store/api/taskApi'
import { toast, ToastContainer } from 'react-toastify'
import SelectOption from '../../../../components/Inputs/SelectOption'
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'

export default function EditTaskPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: taskData, isLoading: isLoadingTask, error: taskError } = useGetTaskDetailQuery(id)
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation()
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
    })

    const [errors, setErrors] = useState({})

    // Populate form when task data is loaded
    useEffect(() => {
        if (taskData) {
            setFormData({
                title: taskData.title || '',
                description: taskData.description || '',
                status: taskData.status || 'pending',
            })
        }
    }, [taskData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateTask({ id, ...formData }).unwrap()
            toast.success('Task updated successfully!')
            setTimeout(() => {
                navigate(`/dashboard/tasks/${id}`)
            }, 3000)
        } catch (error) {
            const errorMessage = error?.data?.message || 'Failed to update task. Please try again.'
            toast.error(errorMessage)
            
            if (error?.data) {
                const fieldErrors = {}
                Object.keys(error.data).forEach(key => {
                    if (Array.isArray(error.data[key])) {
                        fieldErrors[key] = error.data[key][0]
                    } else {
                        fieldErrors[key] = error.data[key]
                    }
                })
                setErrors(fieldErrors)
            }
        }
    }

    const handleCancel = () => {
        navigate(`/dashboard/tasks/${id}`)
    }

    if (isLoadingTask) return <Loading />
    if (taskError) return <Error error="Failed to fetch task" />

    return (
        <div className='w-full'>
            <ToastContainer />
            <div className="mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter task title"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 resize-none ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter task description"
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <SelectOption
                            id="status"
                            name="status"
                            required
                            value={formData.status}
                            onChange={handleChange}
                            className={`w-full ${errors.status ? 'border-red-500' : ''}`}
                            options={[
                                { value: 'pending', label: 'Pending' },
                                { value: 'in_progress', label: 'In Progress' },
                                { value: 'completed', label: 'Completed' }
                            ]}
                        />
                        {errors.status && (
                            <p className="text-sm text-red-500">{errors.status}</p>
                        )}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            {isUpdating ? 'Updating...' : 'Update Task'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isUpdating}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
