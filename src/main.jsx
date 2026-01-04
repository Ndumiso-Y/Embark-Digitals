import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ECard from './pages/ECard.jsx'
import WebsiteDiscoveryForm from './pages/WebsiteDiscoveryForm.jsx'

const router = createBrowserRouter([
  // Standalone, unlisted routes (no navbar/footer)
  { path: '/ecard', element: <ECard /> },
  { path: '/website-discovery', element: <WebsiteDiscoveryForm /> },
  // Main site routes
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
