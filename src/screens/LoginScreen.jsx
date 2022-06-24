import React from 'react'

import { Link } from 'react-router-dom'

export default function LoginScreen() {
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
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">
                                            Bienvenido!!!
                                        </h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Ingresa tu correo electronico..."/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Contrasena"/>
                                        </div>
                                        <a href="index.html" className="btn btn-primary btn-user btn-block">
                                            Ingresar
                                        </a>
                                    </form>
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
