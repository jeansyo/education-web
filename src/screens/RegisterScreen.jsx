import React from 'react'

import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { useDispatch,useSelector } from 'react-redux'

import AuthInput from '../components/ui/AuthInput'
import { schemaRegister } from '../utils/schemas'
import { __authRegister } from '../actions/authActions'

export default function RegisterScreen() {

    const { loading } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch( __authRegister(values, resetForm) )
    }

  return (
    <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                <div 
                    className="row"
                    style={{
                        minHeight: '80vh'
                    }}
                >
                    <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div className="col-lg-7 d-flex align-items-center justify-content-center">
                        <div className="p-5 w-100">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">
                                    Crear Cuenta
                                </h1>
                            </div>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    role: 0 
                                }}
                                validationSchema={ schemaRegister }
                                onSubmit={handleOnSubmit}
                            >
                                {
                                    ({
                                        handleSubmit,
                                    }) => (
                                        <form 
                                            className="user"
                                            onSubmit={handleSubmit}    
                                        >
                                            <AuthInput
                                                name="name"
                                                placeholder="Nombre completo"
                                                type='text'
                                                disabled={loading}
                                            />
                                            <AuthInput
                                                name="email"
                                                placeholder="Correo electrónico"
                                                type='email'
                                                disabled={loading}
                                            />
                                            <AuthInput
                                                name="password"
                                                placeholder="Contraseña"
                                                type='password'
                                                disabled={loading}
                                            />
                                            <AuthInput
                                                name="confirmPassword"
                                                placeholder="Confirmar contraseña"
                                                type='password'
                                                disabled={loading}
                                            />
                                            
                                            <button 
                                                className="btn btn-primary btn-user btn-block bg-color border-0"
                                                role='submit'
                                                disabled={ loading }
                                            >
                                                Crear Cuenta
                                            </button>
                                        </form>
                                    )
                                }
                            </Formik>
                            <hr/>
                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="small"
                                >
                                    Ya tienes una cuenta?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
