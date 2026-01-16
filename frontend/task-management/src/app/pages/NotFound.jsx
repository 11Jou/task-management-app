import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                <p className="text-gray-600">The page you are looking for does not exist.</p>
                <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">Go to Dashboard</Link>
            </div>
        </div>
    )
}