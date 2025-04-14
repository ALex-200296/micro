import { BrowserRouter, Link, useLocation } from "react-router-dom";
import Header from './Header.component'
import { useEffect } from "react";

export default function Root(props) {

  useEffect(() => {
  }, [])

  return <>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </>
}
