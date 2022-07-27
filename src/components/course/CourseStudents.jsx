import React from 'react'

export default function CourseStudents({
    students,
    col1='nomber',
    col2='Correo electrónico',
    col3='Codigo',
}) {

  return (
    <div className="table-responsive">
        <table className="table table-bordered" id="dataTable" width="100%" >
            <thead>
                <tr>
                    <th>
                        {
                            col1
                        }
                    </th>
                    <th>
                        {
                            col2
                        }
                    </th>
                    <th>
                        {
                            col3
                        }
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map(({
                        name,
                        email,
                        code
                    }) => (
                        <tr
                            key={ code }
                        >
                            <td>
                                {
                                    name
                                }
                            </td>
                            <td>
                                {
                                    email
                                }
                            </td>
                            <td>
                                {
                                    code
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}
