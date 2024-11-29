import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const Eliminar = () => {
    const [pelicula, setPelicula] = useState({})
    const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' }); // Estado para la alerta
    const { id } = useParams()
    const navigate = useNavigate() // Para redirigir después de eliminar

    // Cargar los detalles de la película cuando el componente se monta
    useEffect(() => {
        fetch(`http://localhost:2025/api/peliculas/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => setPelicula(data))
            .catch(error => console.error('Error al cargar la película:', error))
    }, [id])

    // Función para manejar la eliminación
    const handleEliminar = async () => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la película "${pelicula.name}"?`)

        if (confirmacion) {
            try {
                const response = await fetch(`http://localhost:2025/api/peliculas/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                })

                if (response.ok) {
                    setAlerta({
                        mensaje: 'Película eliminada exitosamente.',
                        tipo: 'success',
                    });
                    setTimeout(() => {
                        navigate('/peliculas') // Redirige a la página principal
                    }, 10000);
                } else {
                    setAlerta({
                        mensaje: 'Error al eliminar la película.',
                        tipo: 'danger',
                    });
                }
            } catch (error) {
                console.error('Error al eliminar:', error)
                setAlerta({
                    mensaje: 'Ocurrió un error al intentar eliminar la película.',
                    tipo: 'danger',
                });
            }
        }
    }

    // Si la película no está cargada, muestra un mensaje de carga
    if (!pelicula.name) {
        return <div>Cargando...</div>
    }

    return (
        <div className="container my-5">
            <div className="row g-3">
                <div className="col-md-12 col-sm-12 col-12">
                    <h2>Eliminar Película</h2>

                    {/* Mostrar la alerta si existe */}
                    {alerta.mensaje && (
                        <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                            {alerta.mensaje}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setAlerta({ mensaje: '', tipo: '' })}
                                aria-label="Close"
                            ></button>
                        </div>
                    )}

                    <div className="card h-30 d-flex flex-column">
                        <img
                            src={pelicula.img_link}
                            className="card-img-top"
                            alt={pelicula.name}
                            style={{ height: '300px', objectFit: 'cover', width: '100%' }}
                        />
                        <div className="card-body d-flex flex-column">
                            <p className="card-title fs-4 text-primary"><strong>{pelicula.name}</strong></p>
                            <p className="card-text"><strong>Año:</strong> {pelicula.year}</p>

                            <div className="my-3">
                                <p className="fs-6"><strong>Director</strong></p>
                                <p className="card-text">{pelicula.director_name}</p>
                            </div>

                            {/* Botón de eliminación y cancelación */}
                            <div className="mt-auto d-flex flex-column align-items-center justify-content-center">
                                <button onClick={handleEliminar} className="btn btn-danger w-50 my-2">Eliminar</button>
                                <Link to="/peliculas" className="btn btn-success w-50">Cancelar</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eliminar
