import React from 'react'
import ReactDOM from 'react-dom/client'
import Splashscreen from './Pages/Splashscreen.jsx'
import SingIn from './Pages/SingIn.jsx'
import SingUp from './Pages/SingUp.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Chat from './Pages/Chat.jsx'
import BuyTDTokens from './Pages/BuyTDTokens.jsx'
import SendTDTokens from './Pages/SendTDTokens .jsx'
import ManageTDTokens from './Pages/ManageTDTokens.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Splashscreen />
  },
  {
    path: '/login',
    element: <SingIn />
  },
  {
    path: '/createAccount',
    element: <SingUp />
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
    ]
  },
  {
    path: '/tokens/buy',
    element: <BuyTDTokens />
  },
  {
    path: '/tokens/send',
    element: <SendTDTokens />
  },
  {
    path: '/tokens/manage',
    element: <ManageTDTokens />
  },
  {
    path: '/chat',
    element: <Chat />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
