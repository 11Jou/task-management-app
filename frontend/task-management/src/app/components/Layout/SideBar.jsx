import { LayoutDashboard, ClipboardList, FileText, LogOut, CirclePlus  } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const menuItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/dashboard/tasks', label: 'Tasks', icon: ClipboardList },
        { to: '/dashboard/tasks/create', label: 'Create Task', icon: CirclePlus },
        { to: '/dashboard/report', label: 'Report', icon: FileText },
    ];

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout  = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <aside className="fixed left-0 top-0 w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col justify-between">
            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon; 
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end
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
            className="mt-auto flex items-center gap-2 px-4 py-2 rounded-md
                        text-gray-200 hover:bg-gray-700 hover:text-white
                        transition-colors cursor-pointer"
            onClick={handleLogout}
            >
            <LogOut size={20} />
            <span>Logout</span>
            </div>
        </aside>
    );
}
