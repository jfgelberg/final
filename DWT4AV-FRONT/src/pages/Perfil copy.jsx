import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Asegúrate de importar Link
import { obtenerPerfilDeUsuario, agregarFavorito, obtenerPeliculaPorId } from "../services/usuarios.service";

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [nuevoFavorito, setNuevoFavorito] = useState("");
    const [mensajeError, setMensajeError] = useState("");
    const [peliculasFavoritas, setPeliculasFavoritas] = useState([]); // Para almacenar los detalles de las películas favoritas

    const usuarioId = localStorage.getItem("usuarioId"); // Obtén el usuarioId del localStorage

    useEffect(() => {
        if (usuarioId) {
            cargarPerfil();
        } else {
            setMensajeError("ID de usuario no encontrado. Por favor, inicia sesión.");
        }
    }, [usuarioId]);

    const cargarPerfil = async () => {
        try {
            const perfil = await obtenerPerfilDeUsuario(usuarioId);
            setUsuario(perfil);
            // Obtener detalles de las películas favoritas
            if (perfil.favoritos && perfil.favoritos.length > 0) {
                const peliculas = await Promise.all(
                    perfil.favoritos.map(favoritoId => obtenerPeliculaPorId(favoritoId))
                );
                setPeliculasFavoritas(peliculas); // Actualiza las películas favoritas con los nombres y detalles
            }
        } catch (error) {
            setMensajeError("Error al cargar el perfil: " + error.message);
        }
    };

    const manejarAgregarFavorito = async () => {
        if (!nuevoFavorito) {
            alert("Debes ingresar un ID de favorito.");
            return;
        }

        try {
            await agregarFavorito(usuarioId, nuevoFavorito);
            alert("Favorito agregado exitosamente.");
            cargarPerfil(); // Recargar el perfil para mostrar el cambio
        } catch (error) {
            alert("Error al agregar favorito: " + error.message);
        }
    };

    if (mensajeError) {
        return <div className="error">{mensajeError}</div>;
    }

    if (!usuario) {
        return <div>Cargando perfil...</div>;
    }

    return (
        <div className="perfil">
            <h1>Perfil de Usuario</h1>
            <p><strong>Email:</strong> {usuario.email}</p>
            <h2>Tus Favoritos</h2>
            <div className="row g-3">
                {peliculasFavoritas.length > 0 ? (
                    peliculasFavoritas.map((pelicula) => (
                        <div key={pelicula._id} className="col-md-4 col-sm-6 col-12">
                            <div className="card h-100 d-flex flex-column position-relative">
                                {/* Ícono de favorito en la esquina superior derecha */}
                                <img
                                    src={pelicula.img_link}
                                    className="card-img-top"
                                    alt={pelicula.name}
                                    style={{ height: '300px', objectFit: 'cover', width: '100%' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <p className="card-title fs-4 text-primary"><strong>{pelicula.name}</strong></p>
                                    <p className="card-text"><strong>Año:</strong> {pelicula.year}</p>
                                    <p className="card-text"><strong>Duración:</strong> {pelicula.duration}</p>
                                    <p className="card-text"><strong>Género:</strong> {pelicula.genre}</p>
                                    <p className="card-text"><strong>Certificado:</strong> {pelicula.certificate}</p>

                                    <div className="my-3">
                                        <p className="fs-6"><strong>Director</strong></p>
                                        <p className="card-text">{pelicula.director_name}</p>
                                    </div>

                                    <div className="my-3">
                                        <p className="fs-6"><strong>Escritores</strong></p>
                                        <p className="card-text">{pelicula.writter_name}</p>
                                    </div>

                                    <div className="my-3">
                                        <p className="fs-6"><strong>Elenco</strong></p>
                                        <p className="card-text">{pelicula.cast_name}</p>
                                    </div>

                                    <div className="my-3">
                                        <p className="fs-6"><strong>Clasificación IMDb</strong></p>
                                        <p className="card-text">⭐ {pelicula.imdb_rating} ({pelicula.imbd_votes} votos)</p>
                                    </div>

                                    <div className="mt-auto d-flex">
                                        <Link to={"pelicula/" + pelicula._id} className="btn btn-primary w-50 me-2">Ver</Link>
                                        <Link to={"editar/" + pelicula._id} className="btn btn-info w-50">Editar</Link>
                                        <Link to={"eliminar/" + pelicula._id} className="btn btn-danger w-50 ms-2 btnEliminar">X</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay películas para mostrar.</p>
                )}
        </div>
        </div>
    );
};

export default Perfil;