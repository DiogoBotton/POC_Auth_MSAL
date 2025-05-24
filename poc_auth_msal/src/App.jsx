import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import Login from './pages/login/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Login />} />
  )
)

const App = ({routes}) => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
