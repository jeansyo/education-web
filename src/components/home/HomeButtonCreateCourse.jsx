import React from 'react'

import { Formik } from 'formik'
import Swal from 'sweetalert2'

import HomeInput from './HomeInput'
import { schemaCourse } from '../../utils/schemas'
import { fetchWithToken } from '../../utils/fetchWithToken'
import CourseSelectInput from '../course/CourseSelectInput'
import HomeDropdown from './HomeDropdown'
import { materiasList } from '../../utils/materiasList'
import HomeDropdownSelect from './HomeDropdownSelect'

export default function HomeButtonCreateCourse({
    setCourses
}) {

    const createCourse = async (values, resetForm) => {
        try {
            
            const res = await fetchWithToken('api/courses', { ...values }, "POST")
            const {
                api, 
                result
            } = await res.json()

            if ( api.codeError === "201" ) {
                resetForm();

                setCourses(prev => ([result, ...prev]));
                
                document.getElementById('CloseModalCreatedCourse').click()

                Swal.fire({
                    title: api.msgError,
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
                })

            } else {
                Swal.fire({
                    title: api.msgError,
                    icon: "warning",
                    confirmButtonText: "Cerrar",
                    confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
                })
            }
 
        } catch (err) {
            Swal.fire({
                text: error.message,
                title: "Server error",
                icon: "error",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
            })
        }
    }

    const handleOnSubmit = (values, { setSubmitting, resetForm }) => {

        values = {
            ...values,
            recommended: values.recommended.join(', '),
            classname: `${ values.category } - ${ values.classname }`,
        }

        setSubmitting(true)
        createCourse(values, resetForm)
        setSubmitting(false)
    }

  return (
    <>
        
        <button type="button" className="mt-3 mt-sm-0 d-sm-inline-block btn btn-sm bg-color text-white border-0 shadow-sm" data-bs-toggle="modal" data-bs-target="#createCourseModal">
            Crear nuevo curso
        </button>
        <div className="modal fade" id="createCourseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createCourseModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Crear nuevo curso
                    </h5>
                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        classname: '',
                        category: '',
                        recommended: [],
                    }}
                    onSubmit={handleOnSubmit}
                    validationSchema={schemaCourse}
                >
                    {
                        ({
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <>
                                <form
                                    onSubmit={handleSubmit}
                                >
                                    <div className="modal-body">
                                        <HomeInput
                                            label="Nombre del curso"
                                            name="name"
                                            type="text"
                                            placeholder="Lenguaje, Biologia, Matematicas..."
                                            disabled={isSubmitting}
                                        />
                                        <HomeDropdown
                                            label='Clase'
                                            name='classname'
                                            options={ materiasList }
                                            disabled={isSubmitting}
                                            placeholder='Seleccione una clase'
                                            secondName='category'
                                        />
                                        <HomeDropdownSelect
                                            label='Recomendaciones'
                                            name='recommended'
                                            options={ materiasList }
                                            disabled={isSubmitting}
                                            placeholder='Seleccione materias a recomendar'
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button 
                                            id='CloseModalCreatedCourse' 
                                            type="button" className="btn btn-sm btn-danger shadow-sm" 
                                            data-bs-dismiss="modal"
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-sm bg-color text-white shadow-sm"
                                            disabled={isSubmitting}
                                        >
                                            Crear curso
                                        </button>
                                    </div>
                                </form>
                            </>
                        )
                    }
                </Formik>
                
                </div>
            </div>
        </div>
    </>
  )
}
