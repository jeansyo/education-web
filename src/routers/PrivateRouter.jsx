import React, { useEffect } from 'react'

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import NavBar from '../components/ui/NavBar'
import CourseScreen from '../screens/CourseScreen'
import HomeScreen from '../screens/HomeScreen'

export default function PrivateRouter() {

  const navigate = useNavigate()

  useEffect(() => {

    navigate('/')

  }, [])
  

  return (
    <NavBar>
        <Routes>
            <Route path="/" element={ <HomeScreen/> }/>
            <Route path="/:course_id" element={ <CourseScreen/> }/>
            <Route path="*" element={ <Navigate to="/"/> }/>
        </Routes>
    </NavBar>
  )
}
