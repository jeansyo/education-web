import React from 'react'

import { Formik } from 'formik'
import Swal from 'sweetalert2'

import HomeInput from './HomeInput'
import { schemaCode } from '../../utils/schemas'
import { useParams } from 'react-router-dom'
import { fetchWithToken } from '../../utils/fetchWithToken'

export default function HomeButtonAddStudent({
    setStudents
}) {

    const { course_id } = useParams()

    const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        try {
            
            const res = await fetchWithToken(`api/student/${course_id}/${ values.code }`)
            const {
                api,
                result
            } = await res.json()

            if ( api.codeError === "201" ) {
                setStudents(prev => [result, ...prev])
                document.getElementById('buttonclosemodalADDstudent').click()
                resetForm()
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
            console.log(err)
            Swal.fire({
                text: err.message,
                title: "Server error",
                icon: "error",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
            })
        }
        setSubmitting(false)
    }

  return (
    <>
        <button type="button" className="mt-3 mt-sm-0 d-sm-inline-block btn btn-sm bg-color text-white shadow-sm" data-bs-toggle="modal" data-bs-target="#createStudentCourseModal">
            Agregar estudiante
        </button>
        <div className="modal fade" id="createStudentCourseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createStudentCourseModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Agregar estudiante
                    </h5>
                    <button id="buttonclosemodalADDstudent" style={{ display: 'none' }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <Formik
                    initialValues={{
                        code: '',
                    }}
                    validationSchema={ schemaCode }
                    onSubmit={handleOnSubmit}
                >
                    {
                        ({
                            isSubmitting,
                            handleSubmit,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                            >
                                
                                <div className="modal-body">
                                    <HomeInput
                                        name={'code'}
                                        label={'Código del estudiante'}
                                        placeholder={'CODUSR-123'}
                                        type={'text'}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-danger shadow-sm" data-bs-dismiss="modal">
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        role='submit' 
                                        className="btn btn-sm bg-color text-white text-white  shadow-sm"
                                    >
                                        Agregar estudiante
                                    </button>
                                </div>
                            </form>
                        )
                    }
                </Formik>
                </div>
            </div>
        </div>
    </>
  )
}
