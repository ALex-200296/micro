import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.component'
import Main from "./Main.component"
import { lazy } from "react"

const Catalog =  lazy(() => import('./Catalog.component'))
const Design =  lazy(() => import('./Design.component'))

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {

        path: '/',
        element: <Main />,
      },
      {
        path: '/catalog',
        element: <Catalog />,
      },
      {
        path: '/design',
        element: <Design />,
      },
    ]
  },
], { basename: '/infres' })

export default function Root(props) {

  return <RouterProvider router={routes} />
}
