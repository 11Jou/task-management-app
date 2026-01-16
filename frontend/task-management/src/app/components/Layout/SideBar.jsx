import { LayoutDashboard, ClipboardList, FileText, LogOut, CirclePlus, X, ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const menuItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/dashboard/tasks', label: 'Tasks', icon: ClipboardList },
        { to: '/dashboard/tasks/create', label: 'Create Task', icon: CirclePlus },
        { to: '/dashboard/report', label: 'Analytics & Reports', icon: FileText },
    ];

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleClose = () => {
        dispatch(setSidebarOpen(false))
    }

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            dispatch(setSidebarOpen(false))
        }
    }

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={handleClose}
                />
            )}
            
            <aside
                className={`fixed left-0 top-0 w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarOpen && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-md hover:bg-gray-700 transition-colors md:hidden"
                            aria-label="Close sidebar"
                        >
                            <X size={24} />
                        </button>
                    </div>
                )}

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                                        isActive
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>
                <div
                    className="mt-auto flex items-center gap-2 px-4 py-2 rounded-md text-gray-200 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </div>
            </aside>
        </>
    );
}
