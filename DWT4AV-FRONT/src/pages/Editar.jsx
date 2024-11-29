import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Editar = () => {
  const [pelicula, setPelicula] = useState({
    name: '',
    year: '',
    duration: '',
    genre: '',
    certificate: '',
    director_name: '',
    writter_name: '',
    cast_name: '',
    imdb_rating: '',
    imbd_votes: '',
    img_link: ''
  });

  const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' }); // Estado para la alerta
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2025/api/peliculas/" + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        // Asegurarse de que los datos no sean undefined o null
        setPelicula(prevState => ({
          ...prevState,
          name: data.name || '',
          year: data.year || '',
          duration: data.duration || '',
          genre: data.genre || '',
          certificate: data.certificate || '',
          director_name: data.director_name || '',
          writter_name: data.writter_name || '',
          cast_name: data.cast_name || '',
          imdb_rating: data.imdb_rating || '',
          imbd_votes: data.imbd_votes || '',
          img_link: data.img_link || ''
        }));
      })
      .catch(err => {
        console.error('Error al cargar la película:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelicula({
      ...pelicula,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:2025/api/peliculas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(pelicula)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Película actualizada:', data);

        // Mostrar alerta de éxito
        setAlerta({
          mensaje: 'Película actualizada correctamente.',
          tipo: 'success',
        });

        // Redirigir después de unos segundos (para mostrar el mensaje de éxito)
        setTimeout(() => {
          navigate('/peliculas');
        }, 2000);
      })
      .catch(err => {
        console.error('Error al actualizar la película:', err);

        // Mostrar alerta de error
        setAlerta({
          mensaje: 'Error al actualizar la película. Intenta nuevamente.',
          tipo: 'danger',
        });
      });
  };

  const handleCloseAlert = () => {
    setAlerta({ mensaje: '', tipo: '' });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Editar Película</h2>
      {alerta.mensaje && (
        <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
          {alerta.mensaje}
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseAlert}
            aria-label="Close"
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={pelicula.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Año</label>
          <input
            type="number"
            id="year"
            name="year"
            className="form-control"
            value={pelicula.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duración</label>
          <input
            type="text"
            id="duration"
            name="duration"
            className="form-control"
            value={pelicula.duration}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Género</label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="form-control"
            value={pelicula.genre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="certificate" className="form-label">Certificado</label>
          <input
            type="text"
            id="certificate"
            name="certificate"
            className="form-control"
            value={pelicula.certificate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director_name" className="form-label">Director</label>
          <input
            type="text"
            id="director_name"
            name="director_name"
            className="form-control"
            value={pelicula.director_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="writter_name" className="form-label">Escritores</label>
          <input
            type="text"
            id="writter_name"
            name="writter_name"
            className="form-control"
            value={pelicula.writter_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cast_name" className="form-label">Elenco</label>
          <input
            type="text"
            id="cast_name"
            name="cast_name"
            className="form-control"
            value={pelicula.cast_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imdb_rating" className="form-label">Clasificación IMDb</label>
          <input
            type="number"
            step="0.1"
            id="imdb_rating"
            name="imdb_rating"
            className="form-control"
            value={pelicula.imdb_rating}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imbd_votes" className="form-label">Votos IMDb</label>
          <input
            type="number"
            id="imbd_votes"
            name="imbd_votes"
            className="form-control"
            value={pelicula.imbd_votes}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="img_link" className="form-label">Enlace de la Imagen</label>
          <input
            type="text"
            id="img_link"
            name="img_link"
            className="form-control"
            value={pelicula.img_link}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 my-2">Guardar Cambios</button>
        <Link to={"/peliculas"} className="btn btn-info w-100">Volver</Link>
      </form>
    </div>
  );
};

export default Editar;
