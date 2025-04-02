import { BrowserRouter, Link, useLocation } from "react-router-dom";
import Header from './Header.component'

export default function Root(props) {

  return <>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </>
}
