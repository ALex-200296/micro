import React, { lazy, useState } from 'react'
import logo from '/logo.svg'
import './App.css'
import parsePublicAssetsPath from './utils/parse-public-assets-path'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

const HomePage = lazy(() => import('./Home'))

const routes = createBrowserRouter(
    [
        {
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/list',
                    element: <div>list</div>
                },
                {
                    path: '/login',
                    element: <div>login</div>
                }
            ]
        }
    ]
    ,{
        basename: '/vite'
    }
)

function Root() {
    return (
        <RouterProvider router={routes}/>
    )
}

export default Root
