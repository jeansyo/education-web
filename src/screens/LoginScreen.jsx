import React from 'react'

import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AuthInput from '../components/ui/AuthInput'
import { schemaLogin } from '../utils/schemas'
import { __authLogin } from '../actions/authActions'

import Logo from '../assets/logo.jpg'

export default function LoginScreen() {

    const { loading } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch( __authLogin(values, resetForm) )
    }

  return (
    <div className="container">

        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div 
                    className="card o-hidden border-0 shadow-lg my-5"
                >
                    <div className="card-body p-0">
                        <div 
                            className="row"
                            style={{
                                minHeight: '80vh'
                            }}
                        >
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6 d-flex align-items-center">
                                <div className="p-5 w-100">
                                    <div
                                        className="col-12 d-flex justify-content-center mb-2"
                                    >
                                        <img
                                            src={Logo}
                                            style={{
                                                width: '9rem',
                                                height: '7rem',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">
                                            Micro Aprendizaje
                                        </h1>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                            password: '',
                                            role: 0 
                                        }}
                                        onSubmit={handleOnSubmit}
                                        validationSchema={ schemaLogin }
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
                                                        name="email"
                                                        type="email"
                                                        placeholder="Ingresa tu correo electronico..."
                                                        disabled={ loading }
                                                    />
                                                    <AuthInput
                                                        name="password"
                                                        type="password"
                                                        placeholder="Contraseña"
                                                        disabled={ loading }
                                                    />
                                                    <button 
                                                        disabled={ loading }
                                                        role='submit'
                                                        className="btn btn-primary bg-color border-0 btn-user btn-block"
                                                        
                                                    >
                                                        Ingresar
                                                    </button>
                                                </form>
                                            )
                                        }
                                    </Formik>
                                    
                                    <hr/>
                                    <div className="text-center">
                                        <Link
                                            to="/register"
                                            className="small"
                                        >
                                            Crear una cuenta
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
  )
}
