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
import MarketingJobs from './pages/MarketingJobs'
import RegisterProfile from './pages/RegisterProfile'

import Modal from './components/ui/Modal'
import PostJobForm from './components/employer/PostJobForm'
import { JobProvider } from './context/JobContext'
import './App.css'

function App() {
  const [isPostingJob, setIsPostingJob] = useState(false);

  const handlePostSuccess = () => {
    setIsPostingJob(false);
  };

  return (
    <ErrorBoundary>
      <JobProvider>
        <Router>
          <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <Navbar onPostJob={() => setIsPostingJob(true)} />
            <Routes>
              <Route path="/" element={<Home onPostJob={() => setIsPostingJob(true)} />} />
              <Route path="/employers" element={<ForEmployers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/recruiter-profile" element={<RecruiterProfile />} />
              <Route path="/employer-profile" element={<Navigate to="/recruiter-profile" replace />} />
              <Route path="/jobs/:id" element={<JobPage />} />
              <Route path="/marketing-jobs" element={<MarketingJobs />} />
              <Route path="/register-profile" element={<RegisterProfile />} />
            </Routes>

            {/* Global Modals */}
            <Modal
              isOpen={isPostingJob}
              onClose={() => setIsPostingJob(false)}
              title="Post a New Job"
            >
              <PostJobForm onSuccess={handlePostSuccess} />
            </Modal>
          </div>
        </Router>
      </JobProvider>
    </ErrorBoundary>
  )
}

export default App
