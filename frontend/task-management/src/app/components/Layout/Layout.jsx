import { useLocation, Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'

export default function Layout() {
  const location = useLocation()
  const isDashboardRoute = location.pathname.includes('/dashboard')

  if (isDashboardRoute) {
    return <DashboardLayout />
  }

  // For non-dashboard routes, render children directly
  return <Outlet />
}
