import React from 'react'

import { useField } from 'formik'

export default function AuthInput({
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
    <div className="form-group">
        <input 
            type={type} 
            className={ `form-control form-control-user` }
            placeholder={placeholder}
            onBlur={helpers.setTouched}
            value={info.value}
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
