import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import ForEmployers from './pages/ForEmployers'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import RecruiterProfile from './pages/RecruiterProfile';
import JobPage from './pages/JobPage'
import CategoryJobs from './pages/CategoryJobs'
import RegisterProfile from './pages/RegisterProfile'
import RecruiterDashboard from './pages/RecruiterDashboard'
import PostJobPage from './pages/PostJobPage'
import RecruiterSettings from './pages/RecruiterSettings'
import JobApplicants from './pages/JobApplicants'
import SettingsCompanyProfile from './pages/settings/CompanyProfile'
import SettingsNotifications from './pages/settings/Notifications'
import SettingsTeam from './pages/settings/TeamRoles'
import SettingsBilling from './pages/settings/Billing'
import SettingsSecurity from './pages/settings/Security'
import SettingsEmailTemplates from './pages/settings/EmailTemplates'

import { JobProvider, useJobs } from './context/JobContext'
import './App.css'

import JobSeekerHomepage from './pages/JobSeekerHomepage'

const HomeRoute = () => {
  const { user } = useJobs();
  if (user && user.role === 'employer') {
    return <Navigate to="/recruiter-dashboard" replace />;
  }
  return <Home />;
};

function App() {
  return (
    <ErrorBoundary>
      <JobProvider>
        <Router>
          <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/employers" element={<ForEmployers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/recruiter-profile" element={<RecruiterProfile />} />
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter-settings" element={<RecruiterSettings />} />
              <Route path="/recruiter-settings/company-profile" element={<SettingsCompanyProfile />} />
              <Route path="/recruiter-settings/notifications" element={<SettingsNotifications />} />
              <Route path="/recruiter-settings/team" element={<SettingsTeam />} />
              <Route path="/recruiter-settings/billing" element={<SettingsBilling />} />
              <Route path="/recruiter-settings/security" element={<SettingsSecurity />} />
              <Route path="/recruiter-settings/email-templates" element={<SettingsEmailTemplates />} />
              <Route path="/employer-profile" element={<Navigate to="/recruiter-dashboard" replace />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/edit-job/:id" element={<PostJobPage />} />
              <Route path="/job/:id/applicants" element={<JobApplicants />} />
              <Route path="/jobs/:id" element={<JobPage />} />
              <Route path="/jobs/category/:slug" element={<CategoryJobs />} />
              <Route path="/register-profile" element={<RegisterProfile />} />
            </Routes>
          </div>
        </Router>
      </JobProvider>
    </ErrorBoundary>
  )
}

export default App
