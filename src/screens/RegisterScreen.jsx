import React from 'react'

import { Link } from 'react-router-dom'

export default function RegisterScreen() {
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
                            <form className="user">
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Nombre completo"/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Correo electronico"/>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Contrasena"/>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repetir contrasena"/>
                                    </div>
                                </div>
                                <a href="login.html" className="btn btn-primary btn-user btn-block">
                                    Crear Cuenta
                                </a>
                            </form>
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
