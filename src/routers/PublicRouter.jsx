import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default function PublicRouter() {

  return (
    <div className="App bg-gradient-primary position-absolute w-100 h-100">
        <Routes>
            <Route path="/login" element={ <LoginScreen/> }/>
            <Route path="/register" element={ <RegisterScreen/> }/>
            <Route path="*" element={ <Navigate to={'login'}/> }/>
        </Routes>
    </div>
  )
}
