import React from 'react'
import ReactDOMClient from 'react-dom/client'
import './index.css'
import singleSpaReact from "single-spa-react"
import Root from './Root'

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary: (
    err,
    info,
    props
  ) => {
    console.log("====================================");
    console.error(err);
    console.log(info);
    console.log(props);
    console.log("====================================");

    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
