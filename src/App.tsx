import './App.css'
import AdminPage from './pages/AdminPage/AdminPage'
import CustomerPage from './pages/CustomerPage/CustomerPage'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: `/`,
    element: <Navigate to='/admin' />
  },
  {
    path: `/admin`,
    element: <AdminPage />
  },
  {
    path: `/customer`,
    element: <CustomerPage />
  }
])
function App() {
  return <RouterProvider router={router} fallbackElement={<>...loading</>} />
}

export default App
