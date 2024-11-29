import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { agregarFavorito, eliminarFavorito, getFavoritos } from '../../services/usuarios.service';
import './ListadoPeliculas.css';

const ListadoPeliculas = ({ listado, usuarioId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [favoritos, setFavoritos] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(''); // Estado para el género seleccionado

    const moviesPerPage = 9;

    useEffect(() => {
        // Obtén los favoritos del usuario al cargar el componente
        const fetchFavoritos = async () => {
            try {
                const currentUsuarioId = usuarioId || localStorage.getItem('usuarioId');
                if (!currentUsuarioId) return;

                const response = await getFavoritos(currentUsuarioId);
                console.log("Favoritos del usuario:", response); // Agregamos console.log para ver los favoritos
                setFavoritos(response || []);
            } catch (error) {
                console.error("Error al obtener favoritos:", error);
            }
        };

        fetchFavoritos();
    }, [usuarioId]);


    const filteredPeliculas = listado
        .filter((pelicula) =>
            (typeof pelicula.name === 'string' && pelicula.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            pelicula.year.toString().includes(searchTerm)
        )
        .filter((pelicula) =>
            selectedGenre
                ? Array.isArray(pelicula.genre)
                    ? pelicula.genre.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
                    : pelicula.genre.toLowerCase().includes(selectedGenre.toLowerCase())
                : true
        );
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredPeliculas.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredPeliculas.length / moviesPerPage);

    
    const handleAgregarFavorito = async (peliculaId) => {
        try {
            const currentUsuarioId = usuarioId || localStorage.getItem('usuarioId');
            if (!currentUsuarioId) {
                alert("Por favor, inicia sesión para agregar a favoritos.");
                return;
            }

            const respuesta = await agregarFavorito(currentUsuarioId, peliculaId);
            if (respuesta) {
                setFavoritos([...favoritos, peliculaId]);
                alert("Película agregada a tus favoritos.");
            }
        } catch (error) {
            console.error("Error al agregar a favoritos:", error);
            alert("Hubo un error al agregar la película a favoritos.");
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
            }
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
            alert("Hubo un error al eliminar la película de favoritos.");
        }
    };

    const isFavorito = (peliculaId) => favoritos.includes(peliculaId);

    return (
        <div className="container my-5">
            <div className="mb-4">
                <h2>Listado de Películas</h2>
            </div>

            <div className='text-end my-3 w-100'>
                <Link to="/peliculas/nuevapelicula" className="botonNuevo">Crear Película</Link>
            </div>

            <div className="row g-3">
                <div className='col-md-12'>
                    <label htmlFor="search" className="form-label buscarPeli ">Buscar Película</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar película"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="genre" className="form-label">Filtrar por Género</label>
                    <select
                        id="genre"
                        className="form-control"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {/* Puedes agregar los géneros dinámicamente aquí */}
                        <option value="Drama">Drama</option>
                        <option value="Action">Action</option>
                        <option value="Crime">Crime</option>
                        <option value="Adventure">Adventure </option>
                    </select>
                </div>
                {currentMovies.length > 0 ? (
                    currentMovies.map((pelicula) => (
                        <div key={pelicula._id} className="col-md-4 col-sm-6 col-12">
                            <div className="card h-100 d-flex flex-column">
                                <img
                                    src={pelicula.img_link}
                                    className="card-img-top"
                                    alt={pelicula.name}
                                    style={{ height: '600px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <div>
                                        <p className="card-title fs-4 text-primary">
                                            <strong>{pelicula.name}</strong>
                                        </p>
                                        <ul className="card-body">
                                            <li className='listadoPeliculas'><strong>Año:</strong> {pelicula.year}</li>
                                            <li className='listadoPeliculas'><strong>Duración:</strong> {pelicula.duration}</li>
                                            <li className='listadoPeliculas'><strong>Género:</strong> {pelicula.genre}</li>
                                            <li className='listadoPeliculas'><strong>Certificado:</strong> {pelicula.certificate}</li>
                                            <li className=" className='listadoPeliculas'fs-6"><strong>Director:</strong> {pelicula.director_name}</li>
                                            <li className=" className='listadoPeliculas'fs-6"><strong>Escritores:</strong> {pelicula.writter_name}</li><br />
                                            <li className=" className='listadoPeliculas'fs-6"><strong>Elenco:</strong></li>
                                            <li className="listadoPeliculas">{pelicula.cast_name}</li><br />
                                            <li className=" className='listadoPeliculas'fs-6"><strong>Clasificación IMDb:</strong> ⭐ {pelicula.imdb_rating} ({pelicula.imbd_votes} votos)</li>
                                        </ul>
                                    </div>

                                    {/* botones */}
                                    <div className="mt-auto d-flex flex-wrap gap-2 justify-content-center align-center">
                                        <Link to={`pelicula/${pelicula._id}`} className=" botonVer">
                                            Ver
                                        </Link>
                                        <Link to={`editar/${pelicula._id}`} className="botonEditar">
                                            Editar
                                        </Link>
                                        <Link to={`eliminar/${pelicula._id}`} className="botonEliminar">
                                            Eliminar
                                        </Link>
                                        {isFavorito(pelicula._id) ? (
                                            <button
                                                className="botonEliminar w-100"
                                                onClick={() => handleEliminarFavorito(pelicula._id)}
                                            >
                                                Quitar Favorito
                                            </button>
                                        ) : (
                                            <button
                                                className="botonFavorito w-100"
                                                onClick={() => handleAgregarFavorito(pelicula._id)}
                                            >
                                                Agregar Favorito
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron películas que coincidan con la búsqueda.</p>
                )}
            </div>

           {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1} // Desactiva el botón si estás en la primera página
                            >
                                &laquo; Anterior
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages} // Desactiva el botón si estás en la última página
                            >
                                Siguiente &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ListadoPeliculas;
