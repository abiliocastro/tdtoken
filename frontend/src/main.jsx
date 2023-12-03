import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Splashscreen from './Pages/Splashscreen.jsx'
import SingIn from './Pages/SingIn.jsx'
import SingUp from './Pages/SingUp.jsx'
import Main from './Pages/Main.jsx'
import Chat from './Pages/Chat.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Splashscreen />
  },
  {
    path: '/',
    element: <SingIn />
  },
  {
    path: '/createAccount',
    element: <SingUp />
  },
  {
    path: '/main',
    element: <Main />
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
