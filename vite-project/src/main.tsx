import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { INIT_URLS, POLL_URLS } from './constants.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App initUrls={INIT_URLS} pollUrls={POLL_URLS}  />
  </React.StrictMode>,
)
