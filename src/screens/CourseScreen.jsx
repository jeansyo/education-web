import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

import CourseButtonAddMaterial from '../components/course/CourseButtonAddMaterial'
import CourseMaterials from '../components/course/CourseMaterials'
import CourseStudents from '../components/course/CourseStudents'
import HomeButtonAddStudent from '../components/home/HomeButtonAddStudent'
import HomeButtonRemoveStudent from '../components/home/HomeButtonRemoveStudent'
import { fetchWithToken } from '../utils/fetchWithToken'
import CourseEvaluation from '../components/course/CourseEvaluation'
import moment from 'moment'

export default function CourseScreen() {

    const { course_id } = useParams()

    const [students, setStudents] = useState([])
    const [materials, setMaterials] = useState([])
    const [evaluations, setEvaluations] = useState([])
    const [course, setCourse] = useState(null);


    const getInfo = async () => {
        try {
            
            const [
                courseResponse,
                materialsResponse,
                studentsResponse,
                evaluationsResponse
            ] = await Promise.all([
                fetchWithToken(`api/courses/${course_id}`),
                fetchWithToken(`api/materials/${course_id}`),
                fetchWithToken(`api/students/${course_id}`),
                fetchWithToken(`api/course/${course_id}/evaluations`)
            ])
            const [
                courseBody,
                materialsBody,
                studentsBody,
                evaluationsBody
            ] = await Promise.all([
                courseResponse.json(),
                materialsResponse.json(),
                studentsResponse.json(),
                evaluationsResponse.json()
            ])
            // if(courseBody.api.codeError !== "200") {
            //     Swal.fire({
            //         title: courseBody.api.msgError,
            //         icon: "warning",
            //         confirmButtonText: "Cerrar"
            //     })
            // }
            let newEvaluations =[];
            if(evaluationsBody) {
                newEvaluations = evaluationsBody.map((evaluation, idx) => ({
                    ...evaluation,
                    filename: `${moment(evaluation.start).format('DD/MM/YYYY')} - ${moment(evaluation.end).format('DD/MM/YYYY')}`,
                    name: `Evaluación: ${idx+1}`,
                }))
            }

            setCourse(courseBody.result)
            setMaterials(materialsBody.result || [])
            setStudents(studentsBody.result || [])
            setEvaluations(newEvaluations || [])

        } catch (err) {
            console.log(err)
            // Swal.fire({
            //     title: "Server Error",
            //     text: err.message,
            //     icon: "error",
            //     confirmButtonText: "Cerrar",
            //     confirmButtonColor: "#4fd3d8",
            //     cancelButtonColor: "#d33",
            // })
        }
    }

    useEffect(() => {
        getInfo()
    }, [])
    

    const handleDeleteMaterials = async (idx) => {
        try {

            const resultButton = await Swal.fire({
                title: "¿Estas seguro?",
                text: "Una vez eliminado el curso no podras recuperarlo",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar"
            })
            
            if (resultButton.isConfirmed) {

                let res = await fetchWithToken(`api/course/evaluation/remove/${idx}`, {}, "DELETE")
                let api = await res.json()
    
                console.log(api)
                if(api.codeError === "200") {
                    setEvaluations(prev => (prev.filter(material => material.id !== idx)))
                    Swal.fire({
                        title: api.msgError,
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#4fd3d8",
                    })
                } else {
                    Swal.fire({
                        title: api.msgError,
                        icon: "warning",
                        confirmButtonText: "Cerrar",
                                        cancelButtonColor: "#d33",
                    })
                }
            }



        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <div
                className="d-flex flex-column"
            >
                <h1 className="h3 mb-0 text-dark text-capitalize">
                    {
                        course 
                            ? course.name
                            : "Cargando..."
                    }
                </h1>
                <h2
                    className="h5 mb-0 text-gray-800 text-capitalize pe-2"
                >
                    {
                        course
                            ? course.classname
                            : "Cargando..."
                    }
                </h2>
                <h2
                    className="h6 mb-0 text-gray-800 text-capitalize pe-3"
                >
                    {
                        course
                            ? course.recommended
                            : "Cargando..."
                    }
                </h2>
                <CourseEvaluation/>
            </div>
            <div
                className='ms-auto me-0 d-flex flex-row align-items-center'
            >
                <HomeButtonRemoveStudent
                    setStudents={ setStudents }
                />
                <div className='mx-1'></div>
                <HomeButtonAddStudent
                    setStudents={ setStudents }
                />
            </div>
        </div>
        <div className="row">

            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-color">
                            Estudiantes
                        </h6>
                    </div>
                    <div className="card-body">

                        <CourseStudents
                            students={students}
                        />
                    </div>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-color">
                            Materiales
                        </h6>
                        <CourseButtonAddMaterial
                            setMaterials={setMaterials}
                        />
                    </div>
                    <div className="card-body">
                        {
                            materials.length > 0 && (
                                materials.map(material => (
                                    <CourseMaterials
                                        setMaterials={setMaterials}
                                        key={material.id}
                                        {
                                            ...material
                                        }
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
                
            </div>

            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-color">
                            Evaluaciónes
                        </h6>
                    </div>
                    <div className="card-body">
                        {
                            evaluations.length > 0 && (
                                evaluations.map(material => (
                                    <CourseMaterials
                                        setMaterials={setMaterials}
                                        key={material.id}
                                        {
                                            ...material
                                        }
                                        type={5}
                                        onClickIcon={() => console.log("first")}
                                        onClickDelete={() => handleDeleteMaterials(material.id)}
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
                {/* <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-color">
                            Evaluaciónes de estudiantes
                        </h6>
                    </div>
                    <div className="card-body">

                        <CourseStudents
                            col1='nombre'
                            col2='evaluacion'
                            col3='nota'
                            students={students}
                        />
                    </div>
                </div> */}
                
            </div>

        </div>
    </div>
  )
}
