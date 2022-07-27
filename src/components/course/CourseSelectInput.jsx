import React from 'react'

import { useField } from 'formik'

export default function CourseSelectInput({
    name,
    label,
    options,
    disabled
}) {

    const [info, meta, helpers] = useField(name)

    const handleOnSelect = ({ target }) => {
        helpers.setValue(target.value)
    }

  return (
    <>
        <select 
            className="form-select" 
            aria-label="Default select example"
            value={info.value}
            onChange={ handleOnSelect }
            onBlur={helpers.setTouched}
            disabled={disabled}
        >
            <option>
                {
                    label
                }
            </option>
            {
                options.map(({ name, key }) => (
                    <option 
                        key={key} 
                        value={key}
                    >
                        {
                            name
                        }
                    </option>
                ))
            }
        </select>
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
    </>
  )
}
