import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '../components/Layout/Layout'
import ProtectedRoute from './ProtectedRoute'
import NotFound from '../pages/NotFound'

// Lazy load components
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const DashboardPage = lazy(() => import('../pages/dashboard'))
const TasksPage = lazy(() => import('../pages/dashboard/tasks'))
const ReportPage = lazy(() => import('../pages/dashboard/report'))
const CreateTaskPage = lazy(() => import('../pages/dashboard/tasks/create'))
const CreateMultipleTasksPage = lazy(() => import('../pages/dashboard/tasks/create-multiple'))
const TaskDetailPage = lazy(() => import('../pages/dashboard/tasks/[id]'))
const EditTaskPage = lazy(() => import('../pages/dashboard/tasks/[id]/edit'))

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
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
        element: <ProtectedRoute />,
        children: [
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
            path: '/dashboard/tasks/create-multiple',
            element: <CreateMultipleTasksPage />,
          },
          {
            path: '/dashboard/tasks/:id',
            element: <TaskDetailPage />,
          },
          {
            path: '/dashboard/tasks/:id/edit',
            element: <EditTaskPage />,
          },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
