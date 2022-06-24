import React from 'react'
import CourseButtonAddMaterial from '../components/course/CourseButtonAddMaterial'
import CourseMaterials from '../components/course/CourseMaterials'
import CourseStudents from '../components/course/CourseStudents'

import HomeButtonAddStudent from '../components/home/HomeButtonAddStudent'
import HomeButtonRemoveStudent from '../components/home/HomeButtonRemoveStudent'

export default function CourseScreen() {
  return (
    <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
                Matematicas
            </h1>
            <div
                className='ms-auto me-0 d-flex flex-row align-items-center'
            >
                <HomeButtonRemoveStudent/>
                <div className='mx-1'></div>
                <HomeButtonAddStudent/>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-lg-6">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">
                            Materiales
                        </h6>
                        <CourseButtonAddMaterial/>
                    </div>
                    <div class="card-body">
                        <CourseMaterials/>
                    </div>
                </div>
            </div>

            <div class="col-xl-6 col-lg-6">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">
                            Estudiantes
                        </h6>
                    </div>
                    <div class="card-body">
                        <CourseStudents/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
