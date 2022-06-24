import React from 'react'

import { Link } from 'react-router-dom'


export default function NavBar({
    children
}) {
  return (
    <div id="wrapper">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">School Admin <sup>R</sup></div>
            </a>

            <hr className="sidebar-divider my-0"/>

            <li className="nav-item active">
                <Link
                    className='nav-link'
                    to='/'
                >
                    <i className="fas fa-fw fa-tachometer-alt"></i>
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
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                <img className="img-profile rounded-circle"
                                    src="https://picsum.photos/200"/>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Cerrar sesion
                                </a>
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
                        <span>Copyright &copy; Made for Jeansyo</span>
                    </div>
                </div>
            </footer>

        </div>
    </div>
  )
}
