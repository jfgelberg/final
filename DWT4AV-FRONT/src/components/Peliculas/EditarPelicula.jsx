import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarPelicula = () => {
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
      .then(data => setPelicula(data))
  },)

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
        navigate('/peliculas'); // Redirige al usuario después de guardar los cambios
      })
      .catch(err => console.error('Error al actualizar la película:', err));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Editar Película</h2>
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
        <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarPelicula;