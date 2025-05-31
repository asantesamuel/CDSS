import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import History from './pages/Dashboard/History'
import Upload from './pages/Dashboard/Upload'
import Description from './pages/Description'

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' Component={NotFound} />
                <Route path='/' Component={SignIn} />
                <Route path='/dashboard' Component={Dashboard} />
                <Route path='/description' Component={Description} />
                <Route path='/dashboard/history' Component={History} />
                <Route path='/dashboard/upload' Component={Upload} />
                <Route path='/signup' Component={SignUp} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation