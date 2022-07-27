import React from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { __authLogout } from '../../actions/authActions'

export default function NavBar({
    children
}) {

    const dispatch = useDispatch()
    const { user: { name } } = useSelector(state => state.auth)

    const handleOnLogout = () => {
        dispatch( __authLogout() )
    }


  return (
    <div id="wrapper">
        <ul className="navbar-nav bg-color sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon  d-md-none">
                    MICAP
                </div>
                <div className="sidebar-brand-text mx-3">Micro Aprendizaje</div>
            </a>

            <hr className="sidebar-divider my-0 bg-white"/>

            <li className="nav-item active">
                <Link
                    className='nav-link'
                    to='/'
                >
                    <span>Panel de control</span>
                </Link>
            </li>
        </ul>
        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>


                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="text-capitalize mr-2 d-none d-lg-inline text-gray-600 small">
                                    {
                                        name
                                    }
                                </span>
                                <div
                                    className="bg-color text-uppercase img-profile rounded-circle text-white d-flex align-items-center justify-content-center"
                                >
                                    {
                                        name.charAt(0)
                                    }
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-left dropdown-menu-start shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <div 
                                    className="dropdown-item" 
                                    data-toggle="modal" 
                                    data-target="#logoutModal"
                                    onClick={handleOnLogout}
                                >
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Cerrar sesion
                                </div>
                            </div>
                        </li>

                    </ul>

                </nav>
                {
                    children
                }

            </div>
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy;</span>
                    </div>
                </div>
            </footer>

        </div>
    </div>
  )
}
