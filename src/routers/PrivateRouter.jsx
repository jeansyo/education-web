import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'

import NavBar from '../components/ui/NavBar'
import CourseScreen from '../screens/CourseScreen'
import HomeScreen from '../screens/HomeScreen'

export default function PrivateRouter() {
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
