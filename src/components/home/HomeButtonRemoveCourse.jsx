import React from 'react'
import Swal from 'sweetalert2'
import { fetchWithToken } from '../../utils/fetchWithToken'

export default function HomeButtonRemoveCourse({
    id,
    setCourses
}) {

    const handleOnClick = async () => {
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
                let res = await fetchWithToken(`api/courses/${id}`, {}, "DELETE")
                let {
                    api,
                    ...rest
                } = await res.json()
                if (api.codeError === "200") {
                    setCourses(prev => prev.filter(course => course.id !== id))
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
    }

  return (
    <div 
        className="col-auto btn btn-sm btn-danger px-3"
        onClick={handleOnClick}
    >
        Eliminar
    </div>
  )
}
