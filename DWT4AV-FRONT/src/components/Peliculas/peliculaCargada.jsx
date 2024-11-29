import React from 'react';
import { Link } from 'react-router-dom';

const PeliculaCargada = ({ pelicula }) => {
  return (
    <div className="container my-4">
      <h3>Película Cargada Recientemente</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{pelicula.name}</h5>
          <p><strong>Año:</strong> {pelicula.year}</p>
          <p><strong>Duración:</strong> {pelicula.duration} minutos</p>
          <p><strong>Género:</strong> {pelicula.genre}</p>
          <p><strong>Votos IMDb:</strong> {pelicula.imbd_votes}</p>
          <p><strong>Clasificación IMDb:</strong> {pelicula.imdb_rating}</p>
          <p><strong>Director:</strong> {pelicula.director_name}</p>
          <p><strong>Elenco:</strong> {pelicula.cast_name}</p>
          <p><strong>Escritores:</strong> {pelicula.writter_name}</p>
        </div>
      </div>
      <link to="/peliculas" className="btn btn-primary mt-3">Volver al Inicio</link>
    </div>
  );
};

export default PeliculaCargada;