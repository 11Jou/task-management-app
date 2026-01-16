import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Avatar from './Avatar'

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <div className="bg-white border-b border-gray-200 p-4 flex justify-end ml-64">
                    <Avatar />
                </div>
                <main className="flex-1 p-4 bg-gray-50 ml-64">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}