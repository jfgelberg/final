import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Asegúrate de importar Link
import { obtenerPerfilDeUsuario, agregarFavorito, eliminarFavorito, obtenerPeliculaPorId } from "../services/usuarios.service";
import "./ListadoPerfil.css";

const Perfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [nuevoFavorito, setNuevoFavorito] = useState("");
    const [mensajeError, setMensajeError] = useState("");
    const [peliculasFavoritas, setPeliculasFavoritas] = useState([]); // Para almacenar los detalles de las películas favoritas
    const [favoritos, setFavoritos] = useState([]);

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


    const handleEliminarFavorito = async (peliculaId) => {
        try {
            const currentUsuarioId = usuarioId || localStorage.getItem('usuarioId');
            if (!currentUsuarioId) {
                alert("Por favor, inicia sesión para eliminar de favoritos.");
                return;
            }

            const respuesta = await eliminarFavorito(currentUsuarioId, peliculaId);
            if (respuesta) {
                setFavoritos(favoritos.filter(id => id !== peliculaId));
                alert("Película eliminada de tus favoritos.");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
            alert("Hubo un error al eliminar la película de favoritos.");
        }
    };

    const isFavorito = (peliculaId) => favoritos.includes(peliculaId);


    if (mensajeError) {
        return <div className="error">{mensajeError}</div>;
    }

    if (!usuario) {
        return <div>Cargando perfil...</div>;
    }

    return (
        <div className="perfil">
            <div className="container my-5">
                <h1 className="text-center mb-4">Perfil de Usuario</h1>
                <p className="text-center fs-5">
                    <strong>Email:</strong> {usuario.email}
                </p>

                <h2 className="text-center my-4">Tus Favoritos</h2>
                <div className="row g-4">
                    {peliculasFavoritas.length > 0 ? (
                        peliculasFavoritas.map((pelicula) => (
                            <div key={pelicula._id} className="col-lg-4 col-md-6 col-sm-12">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={pelicula.img_link}
                                        className="card-img-top"
                                        alt={pelicula.name}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <p className="fs-5 card-title text-primary">{pelicula.name}</p>
                                        <ul className="list-unstyled">
                                            <li><strong>Año:</strong> {pelicula.year}</li>
                                            <li><strong>Duración:</strong> {pelicula.duration}</li>
                                            <li><strong>Género:</strong> {pelicula.genre}</li>
                                            <li><strong>Certificado:</strong> {pelicula.certificate}</li>
                                            <li><strong>Director:</strong> {pelicula.director_name}</li>
                                            <li><strong>Escritores:</strong> {pelicula.writter_name}</li><br />
                                            <li><strong>Elenco:</strong> {pelicula.cast_name}</li>
                                            <li><br />
                                                <strong>Clasificación IMDb:</strong> ⭐ {pelicula.imdb_rating} ({pelicula.imbd_votes} votos)
                                            </li>
                                        </ul>
                                        <div className="mt-auto d-flex gap-2 justify-content-center align-center">
                                            <Link to={`/peliculas/pelicula/${pelicula._id}`} className=" botonVer w-100">
                                                Mas información
                                            </Link>


                                            <button
                                                className="botonEliminar w-100"
                                                onClick={() => handleEliminarFavorito(pelicula._id)}
                                            >
                                                Quitar Favorito
                                            </button>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center d-flex flex-column">No hay películas para mostrar.

                            <div className="mt-5">
                                <Link to={`/peliculas`} className="mt-3 w-50 botonVer">
                                    Eleige tu peli favorita!
                                </Link>
                            </div>

                        </div>

                    )}
                </div>
            </div>
        </div>


    );
};

export default Perfil;