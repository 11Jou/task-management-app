import { useState } from 'react'
import { useExportTasksMutation } from '../../store/api/reportApi'
import { toast, ToastContainer } from 'react-toastify'
import SelectOption from '../../components/Inputs/SelectOption'

export default function ReportPage() {
    const [exportTasks, { isLoading }] = useExportTasksMutation()

    
    const [filters, setFilters] = useState({
        from_date: '',
        to_date: '',
        status: '',
    })

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const handleGenerateReport = async () => {
        try {
            const blob = await exportTasks(filters).unwrap()
            
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            
            let filename = 'tasks_report.xlsx'
            
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
            
            toast.success('Report generated and downloaded successfully!')
        } catch (error) {
            const errorMessage = error?.data?.message || 'Failed to generate report. Please try again.'
            toast.error(errorMessage)
        }
    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Generate Report</h1>
                
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Date Range</h2>
                            
                            <div className="space-y-2">
                                <label htmlFor="from_date" className="block text-sm font-medium text-gray-700">
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    id="from_date"
                                    name="from_date"
                                    value={filters.from_date}
                                    onChange={(e) => handleFilterChange('from_date', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="to_date" className="block text-sm font-medium text-gray-700">
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    id="to_date"
                                    name="to_date"
                                    value={filters.to_date}
                                    onChange={(e) => handleFilterChange('to_date', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    min={filters.from_date || undefined}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Task Status</h2>
                            
                            <div className="space-y-2">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <SelectOption
                                    id="status"
                                    name="status"
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    placeholder="All Status"
                                    className="w-full"
                                    options={[
                                        { value: 'pending', label: 'Pending' },
                                        { value: 'in_progress', label: 'In Progress' },
                                        { value: 'completed', label: 'Completed' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <button
                            onClick={handleGenerateReport}
                            disabled={isLoading}
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? 'Generating Report...' : 'Generate Report & Download Excel'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
