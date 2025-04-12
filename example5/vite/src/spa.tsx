import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { Root } from './Root';

const lc = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent:Root,
    errorBoundary(err: any, _info: any, _props: any) {
        return <div>Error: {err}</div>
    },
});


if (import.meta.env.VITE_APP_HMR === 'true') {
    const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
    root.render(<Root />);
}

export const bootstrap = lc.bootstrap;
export const mount = lc.mount;
export const unmount = lc.unmount;