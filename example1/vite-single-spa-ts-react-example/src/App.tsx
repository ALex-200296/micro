import React, { Suspense, useState, useEffect } from 'react'
import logo from '/logo.svg'
import './App.css'
import parsePublicAssetsPath from './utils/parse-public-assets-path'
import { BrowserRouter, Link, Outlet } from 'react-router-dom'
// import { publicApiFunction } from '@org/utils'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // console.log(publicApiFunction())
  }, [])
  return (
    <> <Link to={'/'}>hoscascme</Link>
      <Link to={'/list'}>list</Link>
      <Link to={'/login'}>login</Link>
      <Suspense fallback={'loading'}>
        <Outlet />
      </Suspense>
      hello worldcscsac  sc
    </>
  )
}

export default App
