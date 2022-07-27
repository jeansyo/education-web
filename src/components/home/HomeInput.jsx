import React from 'react'

import { useField } from 'formik'

export default function HomeInput({
    label,
    name,
    type,
    placeholder,
    disabled
}) {

    const [info, meta, helpers] = useField(name)

    const handleOnChange = ({target}) => {
        helpers.setValue(target.value)
    }

  return (
    <div className="mb-3 w-100">
        <label className="form-label">
            {
                label
            }
        </label>
        <input 
            value={info.value}
            type={type} 
            className="form-control" 
            placeholder={ placeholder } 
            onBlur={helpers.setTouched}
            onChange={handleOnChange}
            disabled={disabled}
        />
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
