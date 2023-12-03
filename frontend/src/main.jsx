import React from 'react'
import ReactDOM from 'react-dom/client'
import SingIn from './Pages/SingIn.jsx'
import SingUp from './Pages/SingUp.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Chat from './Pages/Chat.jsx'
import BuyTDTokens from './Pages/BuyTDTokens.jsx'
import SendTDTokens from './Pages/SendTDTokens .jsx'
import ManageTDTokens from './Pages/ManageTDTokens.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SingIn />
  },
  {
    path: '/createAccount',
    element: <SingUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/buyTokens',
    element: <BuyTDTokens />
  },
  {
    path: '/sendTokens',
    element: <SendTDTokens />
  },
  {
    path: '/manageTDTokens',
    element: <ManageTDTokens />
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
