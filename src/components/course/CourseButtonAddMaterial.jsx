import React from 'react'

export default function CourseButtonAddMaterial() {
  return (
    <>
        <button type="button" className="mt-3 mt-sm-0 d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#createMaterialModal">
            Agregar material
        </button>
        <div className="modal fade" id="createMaterialModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createMaterialModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Agregar material al curso
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">
                                Nombre del material
                            </label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Clase, video...."/>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">
                                Archivo
                            </label>
                            <input class="form-control" type="file" id="formFile"/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-sm btn-danger shadow-sm" data-bs-dismiss="modal">
                        Cancelar
                    </button>
                    <button type="button" className="btn btn-sm btn-primary shadow-sm">
                        Agregar material
                    </button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
