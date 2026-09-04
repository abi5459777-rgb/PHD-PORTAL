import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import routes from './routes'
import Home from './pages/Home'
import Login from './pages/Login'
import ResearchInnovation from './pages/ResearchInnovation'
import AboutUs from './pages/AboutUs'
import AdmissionEnquiry from './pages/AdmissionEnquiry'
import ErrorBoundary from './components/ErrorBoundary'

export default function App(){
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/research-and-innovation" element={<ResearchInnovation />} />
        <Route path="/admission-enquiry" element={<AdmissionEnquiry />} />
        <Route path="/contact-us" element={<AdmissionEnquiry />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          {routes.map(r => {
            const C = r.element
            return <Route key={r.path} path={r.path} element={<ErrorBoundary><C /></ErrorBoundary>} />
          })}
        </Route>

        <Route path="*" element={<div className="p-8">Page Not Found</div>} />
      </Routes>
    </ErrorBoundary>
  )
}
