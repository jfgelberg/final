import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')
    const [alert, setAlert] = useState({ message: '', type: '' }) // Estado para la alerta
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== passwordVerify) {
            setAlert({ message: "Las contraseñas no coinciden", type: "danger" })
            return
        }
        try {
            const response = await fetch("http://localhost:2025/api/usuarios", {
                method: "POST",
                body: JSON.stringify({ "email": email, "password": password, "passwordConfirm": passwordVerify }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (response.ok) {
                setAlert({ message: "Usuario registrado con éxito", type: "success" })
                localStorage.setItem('token', data.token)
                navigate('/login')
            } else {
                setAlert({ message: data.message || "Error al registrar usuario", type: "danger" })
            }
        } catch (error) {
            setAlert({ message: "Error de conexión al servidor", type: "danger" })
        }
    }

    const handleCloseAlert = () => {
        setAlert({ message: '', type: '' }) // Resetea el estado de la alerta
    }

    const getInputClassNamePass = () => {
        return password !== passwordVerify ? "form-control is-invalid" : "form-control"
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form
                onSubmit={handleSubmit}
                className="p-4 shadow-lg rounded"
                style={{ width: '350px', backgroundColor: '#f9f9f9' }}
            >
                <h3 className="text-center mb-4 text-info">Registrar un Usuario</h3>
                
                {/* Mostrar alerta si existe */}
                {alert.message && (
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        {alert.message}
                        <button type="button" className="btn-close" onClick={handleCloseAlert} aria-label="Close"></button>
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Ingresa tu correo"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className={  getInputClassNamePass() }
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordVerify" className="form-label">Verificar Contraseña</label>
                    <input
                        type="password"
                        className={  getInputClassNamePass() }
                        id="passwordVerify"
                        placeholder="Repite tu contraseña"
                        onChange={(e) => setPasswordVerify(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-info w-100">Registrar</button>
                <div className="text-center mt-3">
                    <Link to="/login" className="text-decoration-none text-secondary">¿Ya tienes usuario?</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
