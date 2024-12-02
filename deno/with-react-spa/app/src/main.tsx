
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import './index.css'
import App from './App.tsx'
import Page from './Page.tsx'

createRoot(document.getElementById('root')!).render(
  // The basename is used to make sure the app is served from the correct path
  <BrowserRouter basename="/app">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/page" element={<Page />} />
    </Routes>
  </BrowserRouter>
)
