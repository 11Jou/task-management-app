import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateMultipleTasksMutation, useCreateMultipleTasksFromExcelMutation } from '../../../store/api/taskApi'
import { toast, ToastContainer } from 'react-toastify'
import SelectOption from '../../../components/Inputs/SelectOption'
import { Plus, Trash2, Upload, FileSpreadsheet } from 'lucide-react'

export default function CreateMultipleTasksPage() {
    const navigate = useNavigate()
    const [createMultipleTasks, { isLoading }] = useCreateMultipleTasksMutation()
    const [createMultipleTasksFromExcel, { isLoading: isLoadingExcel }] = useCreateMultipleTasksFromExcelMutation()
    
    const [activeTab, setActiveTab] = useState('manual')
    const [tasks, setTasks] = useState([
        { title: '', description: '', status: 'pending' }
    ])
    const [selectedFile, setSelectedFile] = useState(null)

    const addTaskRow = () => {
        setTasks([...tasks, { title: '', description: '', status: 'pending' }])
    }

    const removeTaskRow = (index) => {
        if (tasks.length > 1) {
            setTasks(tasks.filter((_, i) => i !== index))
        }
    }

    const handleTaskChange = (index, field, value) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, [field]: value } : task
        )
        setTasks(updatedTasks)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const validTasks = tasks.filter(task => 
            task.title.trim() && task.description.trim()
        )

        if (validTasks.length === 0) {
            toast.error('Please add at least one task with title and description')
            return
        }

        try {
            await createMultipleTasks(validTasks).unwrap()
            toast.success(`${validTasks.length} task(s) created successfully!`)
            setTimeout(() => {
                navigate('/dashboard/tasks')
            }, 1000)
        } catch (error) {
            const errorMessage = error?.data?.message || 
                               error?.data?.detail || 
                               'Failed to create tasks. Please try again.'
            toast.error(errorMessage)
        }
    }

    const handleCancel = () => {
        navigate('/dashboard/tasks')
    }

    const handleExcelUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validate file type
            const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
            if (!validTypes.includes(file.type) && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
                toast.error('Please upload a valid Excel file (.xlsx or .xls)')
                e.target.value = ''
                return
            }
            setSelectedFile(file)
            toast.info(`File "${file.name}" selected. Click "Create Tasks" to proceed.`)
        }
    }

    const handleCreateFromExcel = async () => {
        if (!selectedFile) {
            toast.error('Please select a file first')
            return
        }

        try {
            await createMultipleTasksFromExcel(selectedFile).unwrap()
            toast.success('Tasks created successfully!')
            setSelectedFile(null)
            setTimeout(() => {
                navigate('/dashboard/tasks')
            }, 2000)
        } catch (error) {
            console.log(error)
            const errorMessage = (error?.data?.message || '') + ' ' + (error?.data?.error || '') || 'Failed to create tasks. Please try again.'
            toast.error(errorMessage.trim() || 'Failed to create tasks. Please try again.')
        }
    }

    const handleRemoveFile = () => {
        setSelectedFile(null)
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) {
            fileInput.value = ''
        }
    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Multiple Tasks</h1>
                
                <div className="mb-6 border-b border-gray-200">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('manual')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'manual'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <Plus size={18} />
                                <span>Manual Entry</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('excel')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'excel'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <Upload size={18} />
                                <span>Upload Excel File</span>
                            </div>
                        </button>
                    </nav>
                </div>

                {activeTab === 'manual' && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Add Multiple Tasks
                            </h2>
                            <button
                                type="button"
                                onClick={addTaskRow}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Plus size={18} />
                                <span>Add Row</span>
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {tasks.map((task, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-medium text-gray-700">
                                            Task #{index + 1}
                                        </h3>
                                        {tasks.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTaskRow(index)}
                                                className="text-red-600 hover:text-red-700 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={task.title}
                                                onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                                placeholder="Enter task title"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Status <span className="text-red-500">*</span>
                                            </label>
                                            <SelectOption
                                                value={task.status}
                                                onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
                                                className="w-full"
                                                options={[
                                                    { value: 'pending', label: 'Pending' },
                                                    { value: 'in_progress', label: 'In Progress' },
                                                    { value: 'completed', label: 'Completed' }
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            value={task.description}
                                            onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                                            placeholder="Enter task description"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? 'Creating Tasks...' : `Create ${tasks.length} Task(s)`}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Excel Upload Tab */}
                {activeTab === 'excel' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-4">
                                <div className="bg-indigo-100 rounded-full p-6">
                                    <FileSpreadsheet size={48} className="text-indigo-600" />
                                </div>
                            </div>
                            
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Upload Excel File
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Upload an Excel file to create multiple tasks at once
                            </p>

                            <div className="max-w-md mx-auto space-y-4">
                                <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                    isLoadingExcel 
                                        ? 'border-indigo-300 bg-indigo-50 cursor-wait' 
                                        : selectedFile
                                        ? 'border-green-300 bg-green-50'
                                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                }`}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {isLoadingExcel ? (
                                            <>
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                                                <p className="text-sm text-indigo-600 font-medium">
                                                    Creating tasks...
                                                </p>
                                            </>
                                        ) : selectedFile ? (
                                            <>
                                                <FileSpreadsheet size={48} className="mb-4 text-green-600" />
                                                <p className="mb-2 text-sm text-gray-700 font-medium">
                                                    {selectedFile.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    File selected successfully
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={48} className="mb-4 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Excel files only (.xlsx, .xls, .csv)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={handleExcelUpload}
                                        disabled={isLoadingExcel || selectedFile}
                                        className="hidden"
                                    />
                                </label>

                                {selectedFile && (
                                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <FileSpreadsheet size={20} className="text-gray-600" />
                                            <span className="text-sm text-gray-700 font-medium">
                                                {selectedFile.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                ({(selectedFile.size / 1024).toFixed(2)} KB)
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="text-red-600 hover:text-red-700 transition-colors"
                                            disabled={isLoadingExcel}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleCreateFromExcel}
                                        disabled={!selectedFile || isLoadingExcel}
                                        className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isLoadingExcel ? 'Creating Tasks...' : 'Create Tasks'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={isLoadingExcel}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
