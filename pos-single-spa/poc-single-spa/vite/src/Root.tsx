import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { App } from './App.component'

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {

        path: '/',
        element: 'hello',
      },
      {
        path: '/about',
        element: 'world',
      },
      {
        path: '/profile',
        element: 'calendar',
      },
    ]
  },
], { basename: '/vite' })

export const Root = (props: any) => {

  return <RouterProvider router={routes} />
}