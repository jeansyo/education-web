import React from 'react'

import { useField } from 'formik'

export default function CourseFileInput({
    label,
    name,
    disabled,
}) {

    const [ info, meta, helpers ] = useField(name)

    const handleOnChange = ({ target }) => {
        helpers.setValue(target.files[0])
    }

  return (
    <div className="mb-3">
        <label className="form-label">
            {
                label
            }
        </label>
        <input disabled={disabled} onChange={handleOnChange} className="form-control" type="file"/>
        {
            meta.error && meta.touched && (
                <div
                    className='form-text text-danger'
                >
                    {
                        meta.error
                    }
                </div>
            )
        }
    </div>
  )
}
