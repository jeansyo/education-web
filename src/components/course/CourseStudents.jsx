import React from 'react'

export default function CourseStudents() {
  return (
    <div class="table-responsive">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Correo electronico
                    </th>
                    <th>
                        Codigo
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tiger Nixon</td>
                    <td>jeansyo@gmail.com</td>
                    <td>CODUSR-123</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
