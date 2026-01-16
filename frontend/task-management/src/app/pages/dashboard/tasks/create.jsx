import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateTaskMutation } from '../../../store/api/taskApi'
import { toast, ToastContainer } from 'react-toastify'
import SelectOption from '../../../components/Inputs/SelectOption'

export default function CreateTaskPage() {
    const navigate = useNavigate()
    const [createTask, { isLoading }] = useCreateTaskMutation()
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleAddMultipleTasks = async () => {
        navigate('/dashboard/tasks/create-multiple')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createTask(formData).unwrap()
            toast.success('Task created successfully!')
            setTimeout(() => {
                navigate('/dashboard/tasks')
            }, 2000)
        } catch (error) {
            const errorMessage = error?.data?.message || 'Failed to create task. Please try again.'
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
        navigate('/dashboard/tasks')
    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <div className="flex flex-col mx-auto gap-4">
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h1>
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleAddMultipleTasks}
                        className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg cursor-pointer disabled:cursor-not-allowed">
                        Add Multiple Tasks
                    </button>

                </div>
                
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
                            disabled={isLoading}
                            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            {isLoading ? 'Creating...' : 'Create Task'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
