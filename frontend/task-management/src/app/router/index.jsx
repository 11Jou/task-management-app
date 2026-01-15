import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '../components/Layout/Layout'

// Lazy load components for code splitting
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const DashboardPage = lazy(() => import('../pages/dashboard'))
const TasksPage = lazy(() => import('../pages/dashboard/tasks'))
const ReportPage = lazy(() => import('../pages/dashboard/report'))
const CreateTaskPage = lazy(() => import('../pages/dashboard/tasks/create'))
const TaskDetailPage = lazy(() => import('../pages/dashboard/tasks/[id]'))

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
)

// Create router configuration
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/dashboard/tasks',
        element: <TasksPage />,
      },
      {
        path: '/dashboard/report',
        element: <ReportPage />,
      },
      {
        path: '/dashboard/tasks/create',
        element: <CreateTaskPage />,
      },
      {
        path: '/dashboard/tasks/:id',
        element: <TaskDetailPage />,
      },
    ],
  },
])

// Router component with Suspense
export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
