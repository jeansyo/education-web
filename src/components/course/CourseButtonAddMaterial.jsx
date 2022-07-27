import React from 'react'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Formik } from 'formik'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { firebaseStorage } from '../../config/firebase'
import { schemaMaterial } from '../../utils/schemas'
import HomeInput from '../home/HomeInput'
import CourseSelectInput from './CourseSelectInput'
import CourseFileInput from './CourseFileInput'
import { fetchWithToken } from '../../utils/fetchWithToken'

export default function CourseButtonAddMaterial({
    setMaterials,
}) {

    let { course_id } = useParams()

    const handleOnSubmit = (values, { setSubmitting, resetForm }) => {

        setSubmitting(true)

        const { file, ...rest } = values
        
        const storageRef = ref(firebaseStorage, `/static/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            }, (error) => {
                console.log(error)
                setSubmitting(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {

                        let data = {
                            link: url,
                            name: rest.title,
                            type: parseInt(rest.type),
                            filename: file.name,
                        }

                        fetchWithToken(`api/materials/${course_id}`, data, "POST")
                            .then(res => res.json())
                            .then(({api, result}) => {

                                if(api.codeError === "201") {
                                    setMaterials(prev => [result, ...prev])
                                    resetForm()
                                    setSubmitting(false)
                                    document.getElementById('Close?ModaADDMATErial').click()
                                    Swal.fire({
                                        title: 'Material agreagado exitosamente',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                        text: api.msgError,
                                        confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
                                    })
                                } else {
                                    Swal.fire({
                                        title: 'Error al agregar material',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                        text: api.msgError,
                                        confirmButtonColor: "#4fd3d8",
                cancelButtonColor: "#d33",
                                    })
                                }

                            })
                            .catch(err => {
                                console.log(err)
                                setSubmitting(false)
                            })
                    })
            }
        )

    }

  return (
    <>
        <button type="button" className="mt-3 mt-sm-0 d-sm-inline-block btn btn-sm bg-color text-white shadow-sm" data-bs-toggle="modal" data-bs-target="#createMaterialModal">
            Agregar material
        </button>
        <div className="modal fade" id="createMaterialModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createMaterialModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Agregar material al curso
                    </h5>
                    <button id="Close?ModaADDMATErial" style={{ display: 'none' }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <Formik
                        initialValues={{
                            title: '',
                            file: null,
                            link: '',
                            type: 0
                        }}
                        validationSchema={ schemaMaterial }
                        onSubmit={handleOnSubmit}
                    >
                        {
                            ({
                                handleSubmit,
                                isSubmitting,
                                values
                            }) => (
                                <form
                                    onSubmit={handleSubmit}
                                >
                                    <div className="modal-body">
                                        <HomeInput
                                            name="title"
                                            label="Nombre del material"
                                            type="text"
                                            placeholder="Clase, video...."
                                            disabled={isSubmitting}
                                        />
                                        {
                                            values.type !== "4"
                                                && (
                                                    <CourseFileInput
                                                        name='file'
                                                        label='Archivo'
                                                        disabled={isSubmitting}
                                                    />
                                                )
                                        }
                                        <CourseSelectInput
                                            name="type"
                                            label="Tipo de material"
                                            disabled={isSubmitting}
                                            options={[
                                                {
                                                    key: 0,
                                                    name: "Video"
                                                },
                                                {
                                                    key: 1,
                                                    name: "Documento"
                                                },
                                                {
                                                    key: 2,
                                                    name: "Imagen"
                                                },
                                                {
                                                    key: 3,
                                                    name: "Audio"
                                                }
                                                // ,
                                                // {
                                                //     key: 4,
                                                //     name: "Comunicado"
                                                // }
                                            ]}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button  disabled={isSubmitting} type="button" className="btn btn-sm btn-danger shadow-sm" data-bs-dismiss="modal">
                                            Cancelar
                                        </button>
                                        <button disabled={isSubmitting} type="submit" role='submit' className="btn btn-sm bg-color text-white shadow-sm">
                                            Agregar material
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
