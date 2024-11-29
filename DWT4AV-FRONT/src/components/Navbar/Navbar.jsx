import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToken } from "../../contexts/session.context"
const NavBar = () => {

    const token = useToken()
    
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark text-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">El Rincón del Cine</Link>
                {/* {user && <h2>Hola! {user.email}</h2>} */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarNav">
                    <ul className='navbar-nav' >
                        {
                            !token
                                ? <>
                                    <li className='nav-item' >
                                        <Link className='nav-link' to="/login">Ingresar</Link>
                                    </li>
                                    <li className='nav-item' >
                                        <Link className='nav-link' to="/register">Registrarse</Link>
                                    </li>
                                </>
                                : <>
                                    <li className='nav-item' >
                                        <Link className='nav-link' to="/">Home</Link>
                                    </li>
                                    <li className='nav-item' >
                                        <Link className='nav-link' to="/peliculas">Peliculas</Link>
                                    </li>
                                    <li className='nav-item' >
                                        <Link className='nav-link' to="/mi-perfil">Perfil</Link>
                                    </li>
                                    <li className='nav-item' >
                                        <Link className='nav-link' to="/logout">Salir</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar