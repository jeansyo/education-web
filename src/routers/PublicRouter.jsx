import React, { useEffect } from 'react'

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default function PublicRouter() {

  const navigate = useNavigate()

  useEffect(() => {

    navigate('/login')

  }, [])

  return (
    <div 
      className="App position-absolute w-100 h-100 bg-color"
    >
        <Routes>
            <Route path="/login" element={ <LoginScreen/> }/>
            <Route path="/register" element={ <RegisterScreen/> }/>
            <Route path="*" element={ <Navigate to="/login"/> }/>
        </Routes>
    </div>
  )
}
