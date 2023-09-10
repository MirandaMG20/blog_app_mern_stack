import { Routes, Route } from 'react-router-dom'
import React from "react"
import "./index.css";
import Header from "./components/Header"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import UserDashboard from './pages/UserDashboard'

function App() {

  return (
    <>
      <Header />

      {/* ROUTES */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<UserDashboard />} />
      </Routes>
    </>
  )
}


export default App
