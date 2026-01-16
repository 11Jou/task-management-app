import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
    const location = useLocation()
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    )
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <Outlet />
}
