import React from 'react'

export default function CourseMaterials() {
  return (
    <div
        className='col-12 p-1 d-flex flex-row align-items-center'
    >
        <div
            className='rounded-circle bg-primary text-white d-flex flex-column justify-content-center align-items-center'
            style={{
                width: '2.8rem',
                height: '2.8rem',
                minHeight: '2.8rem',
                minWidth: '2.8rem',
            }}
        >
            sdsa
        </div>
        <div
            className='ms-3'
        >
            <div
                className='text-primary'
            >
                <h3
                    className='fs-5 mb-0'
                >
                    Matematicas
                </h3>
            </div>
            <div
                className='text-secondary'
            >
                <h6
                    className='mb-0'
                    style={{
                        fontSize: '0.8rem',
                    }}
                >
                    Matematicas.pdf
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
                }}
            >
                D
            </div>
        </div>
    </div>
  )
}
