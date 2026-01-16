import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import SideBar from './SideBar'
import Avatar from './Avatar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleSidebar } from '../../store/slices/uiSlice'

export default function DashboardLayout() {
    const dispatch = useAppDispatch()
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar())
    }

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
                {/* Header with toggle button */}
                <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <button
                        onClick={handleToggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={24} className="text-gray-700" />
                    </button>
                    <div className="flex-1 flex justify-end">
                        <Avatar />
                    </div>
                </div>
                <main className="flex-1 p-4 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}