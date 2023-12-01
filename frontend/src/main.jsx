import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import SingIn from './Pages/SingIn.jsx'
// import SingUp from './Pages/SingUp.jsx'
import Menu from './Pages/Menu.jsx'
import Chat from './Pages/Chat.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SingIn />
  },
  {
    path: '/menu',
    element: <Menu />
  },
  {
    path: '/chat',
    element: <Chat />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
