import React from 'react'

export default function HomeButtonAddStudent() {
  return (
    <>
        <button type="button" className="mt-3 mt-sm-0 d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#createStudentCourseModal">
            Agregar estudiante
        </button>
        <div className="modal fade" id="createStudentCourseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createStudentCourseModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Agregar estudiante
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">
                            Codigo del estudiante
                        </label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="CODUSR-123"/>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-sm btn-danger shadow-sm" data-bs-dismiss="modal">
                        Cancelar
                    </button>
                    <button type="button" className="btn btn-sm btn-primary shadow-sm">
                        Agregar estudiante
                    </button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
