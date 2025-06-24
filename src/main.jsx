import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from "@mui/material"
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HelmetProvider>
      <CssBaseline />
      <App />
    </HelmetProvider>
  </Provider>
)
