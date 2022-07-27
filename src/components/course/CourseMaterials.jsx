import React from 'react'

import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
    BsFillTrashFill,
    BsCardImage,
    BsFillCameraVideoFill,
    BsFillFileEarmarkTextFill,
    BsFillChatRightTextFill,
    BsSoundwave,
    BsFileEarmarkText
} from "react-icons/bs";

import { fetchWithToken } from '../../utils/fetchWithToken'
import CourseStudents from './CourseStudents';
import { useEffect } from 'react';
import { useState } from 'react';

export default function CourseMaterials({
    name,
    link,
    type,
    id,
    setMaterials,
    filename,
    onClickDelete,
    onClickIcon
}) {

    const [responses, setResponses] = useState([])

    const getInfo = async() => {
        try {
            
            const res = await fetchWithToken(`api/course/evaluation/${id}/resolved`)
            const body = await res.json()

            setResponses(body.map(item => ({
                name: item.username,
                email: item.codUsr,
                code: `${item.score}/100`,
            })))

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])
    

    const { course_id } = useParams()

    const handleOnDelete = async() => {
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

                let res = await fetchWithToken(`api/materials/${course_id}/${id}`, {}, "DELETE")
                let { api } = await res.json()
    
                if(api.codeError === "200") {
                    setMaterials(prev => (prev.filter(material => material.id !== id)))
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
    <div
        className='col-12 p-1 d-flex flex-row align-items-center '
    >
        <div class="modal fade" id={`staticBackdrop${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        Evaluación 
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-color">
                                Estudiantes evaluados
                            </h6>
                        </div>

                            <CourseStudents
                                col1='nombre'
                                col2='codigo'
                                col3='nota'
                                students={responses}
                            />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
        <div
            className='rounded-circle bg-primary text-white d-flex flex-column justify-content-center align-items-center'
            style={{
                width: '2.8rem',
                height: '2.8rem',
                minHeight: '2.8rem',
                minWidth: '2.8rem',
            }}
            onClick={onClickIcon? onClickIcon: null}
            data-bs-toggle="modal"
            data-bs-target={onClickIcon?`#staticBackdrop${id}`:''}
        >
            {
                type === 0
                    && (
                        <BsFillCameraVideoFill
                            size={'1.5rem'}
                            color={'#fff'}
                        />
                    )
            }
            {
                type === 1
                    && (
                        <BsFillFileEarmarkTextFill
                            size={'1.5rem'}
                            color={'#fff'}
                        />
                    )
            }
            {
                type === 2
                    && (
                        <BsCardImage
                            size={'1.5rem'}
                            color={'#fff'}
                        />
                    )
            }
            {
                type === 3
                    && (
                        <BsSoundwave
                            size={'1.5rem'}
                            color={'#fff'}
                        />
                    )
            }
            {
                type === 4
                    && (
                        <BsFillChatRightTextFill
                            size={'1.5rem'}
                            color={'#fff'}
                        />
                    )
            }
            {
                type === 5
                    && (
                        <BsFileEarmarkText
                            size={'1.5rem'}
                            color={'#fff'}
                        />
                    )
            }
        </div>
        <div
            className='ms-2 col-7'
        >
            <div
                className='text-primary'
            >
                <h3
                    className='fs-6 mb-0 text-nowrap'
                >
                    {
                        name
                    }
                </h3>
            </div>
            <div
                className='text-secondary overflow-hidden'
            >
                <h6
                    className='mb-0 text-nowrap text-truncate'
                    style={{
                        fontSize: '0.8rem',
                    }}
                >
                    {
                        filename || '- - -'
                    }
                </h6>
            </div>
        </div>
        <div
            className='ms-auto'
        >
            <div
                className='rounded-circle bg-danger text-white d-flex flex-column justify-content-center align-items-center'
                style={{
                    width: '2.3rem',
                    height: '2.3rem',
                    minHeight: '2.3rem',
                    minWidth: '2.3rem',
                    cursor: 'pointer',
                }}
                onClick={onClickDelete? onClickDelete: handleOnDelete}
            >
                <BsFillTrashFill
                    size={'1.25rem'}
                    color={'#fff'}
                    
                />
            </div>
        </div>
    </div>
  )
}
