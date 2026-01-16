import { useLocation, Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { useAppSelector } from '../../store/hooks'

export default function Layout() {
  const location = useLocation()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const isDashboardRoute = location.pathname.includes('/dashboard')

  if (isDashboardRoute && isAuthenticated) {
    return <DashboardLayout />
  }

  return <Outlet />
}
