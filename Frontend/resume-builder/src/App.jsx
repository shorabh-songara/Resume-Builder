import React from 'react'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/ResumeUpdate/LandingPage'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import EditResume from './pages/ResumeUpdate/EditResume'
import DashBoard from './pages/Home/DashBoard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserProvider from './context/userContext'
function App() {

  return (
    <UserProvider>
    <div>

    <Router>
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path='/dashboard' element = {<DashBoard/>}/>
        <Route path='/resume/:resumeId'  element = {<EditResume/>}/>
      </Routes>
    </Router>
    </div>

    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px"
      }

    }}
    />

    </ UserProvider>
  )
}

export default App;
