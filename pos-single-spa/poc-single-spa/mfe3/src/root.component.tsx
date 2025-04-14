import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.component"
import Main from './Main.component'
import { lazy } from "react"

const Logistics = lazy(() => import('./Logistics.component'))
const Calendar = lazy(() => import('./Calendar.component'))


export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {

        path: '/',
        element: <Main />,
      },
      {
        path: '/logistics',
        element: <Logistics />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
    ]
  },
], { basename: '/oneteam' })

export default function Root(props) {

  return <RouterProvider router={routes} />
}
