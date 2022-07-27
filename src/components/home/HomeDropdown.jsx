import React from 'react'

import { useField } from 'formik'

export default function HomeDropdown({
    label,
    name,
    options,
    placeholder,
    disabled,
    secondName
}) {

    const [info, meta, helpers] = useField(name)
    const [infoSecond, metaSecond, helpersSecond] = useField(secondName)

    const handleOnSelect = (classname, course, category) => {
        helpers.setValue(classname)
        helpersSecond.setValue(`${category} - ${course}`)
    }

  return (
    <div className="mb-3">
        <label className="form-label">
            {
                label
            }
        </label>
        <div className="btn-group w-100">
            <button 
                className="form-control dropdown-toggle text-start d-flex flex-row align-items-center justify-content-between" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                onBlur={helpers.setTouched}
                style={{
                    overflow: 'hidden',
                }}
            >
                {
                    info?.value || placeholder
                }
            </button>
            <ul className="dropdown-menu w-100">
                {
                    options.map((option) => (
                        <>
                            <li
                                key={option.category}
                            >
                                <h5
                                    className='dropdown-header h5 text-uppercase text-wrap my-2'
                                >
                                    {
                                        option.category
                                    }
                                </h5>
                            </li>
                            {
                                option.courses.map((course) => (
                                    <>
                                        <li
                                            key={ course.name }
                                        >
                                            <h6 className="ms-1 dropdown-header text-wrap">
                                                {
                                                    course.name
                                                }
                                            </h6>
                                        </li>
                                        {
                                            course.themes.map((theme) => (
                                                <li
                                                    key={theme.name}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <p 
                                                        className="dropdown-item ms-3 text-wrap"
                                                        onClick={() => handleOnSelect(theme.name, course.name, option.category)}
                                                    >
                                                        {
                                                            `- ${theme.name}`
                                                        }
                                                    </p>
                                                </li>
                                            ))
                                        }
                                    </>
                                ))
                            }
                        </>
                    ))
                }
            </ul>
        </div>
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
