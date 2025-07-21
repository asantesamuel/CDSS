import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import History from './pages/Dashboard/History'
import Upload from './pages/Dashboard/Upload'
import Description from './pages/Description'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import PatientProfile from './pages/PatientProfile'

const Navigation = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" Component={NotFound} />
          <Route path="/" Component={SignIn} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/dashboard/description" Component={Description} />
          <Route path="/dashboard/history" Component={History} />
          <Route path="/dashboard/upload" Component={Upload} />
          <Route path="/dashboard/patient/:id" Component={PatientProfile} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/profile" Component={Profile} />
          <Route path="/reset-password" Component={ForgotPassword} />
        </Routes>
      </BrowserRouter>
    );
}

export default Navigation