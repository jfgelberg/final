import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../index.css'; 

const HomePage = () => {
  return (
    <div>
      <header className="text-center mt-4">
        <h1>Bienvenidos a "El Rincón del Cine"</h1>
        <p>Todo lo que necesitas saber del mundo del cine y más.</p>
      </header>

      {/* Carousel */}
      <Carousel className="mb-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/public/img/carousel.jpg"
            alt="Cartelera 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/public/img/carousel1.jpg"
            alt="Cartelera 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/public/img/carousel2.jpg"
            alt="Cartelera 3"
          />
        </Carousel.Item>
      </Carousel>
      <div className="text-center mt-4">
        <h1>Cartelera de Reseñas"</h1>
        <p>Opiniones de cineastas y usuarios sobre las ultimas películas</p>
      </div>
      {/* Cartelera de Reseñas */}
      <div className="container">
        {[
          {
            title: 'Joker: Folie à Deux',
            releaseDate: '3 de octubre de 2024',
            duration: '2h 19min',
            genres: 'Acción, Drama, Romántico',
            director: 'Todd Phillips',
            cast: 'Joaquin Phoenix, Lady Gaga, Brendan Gleeson',
            synopsis: 'Secuela de la película de 2019 dirigida por Todd Phillips que repite tras las cámaras con Joaquin Phoenix como protagonista.',
            ratings: { medios: 3.1, usuarios: 2.8, sensacion: 4.0 },
              image: 'public/img/cartelera.jpg',
          },
          {
            title: 'No hables con extraños',
            releaseDate: '12 de septiembre de 2024',
            duration: '1h 50min',
            genres: 'Terror',
            director: 'James Watkins',
            cast: 'James McAvoy, Mackenzie Davis, Aisling Franciosi',
            synopsis: 'Cuando una familia americana es invitada a pasar el fin de semana en la finca de una familia británica, todo se convierte en una pesadilla psicológica.',
            ratings: { medios: 3.3, usuarios: 3.3 },
            image: '/public/img/cartelera2.jpg',
          },
          {
            title: 'Robot salvaje',
            releaseDate: '10 de octubre de 2024',
            duration: '1h 42min',
            genres: 'Infantil/Aventura',
            director: 'Chris Sanders',
            cast: 'Pedro Pascal, Catherine O\'Hara, Bill Nighy, Kit Connor, Stephanie Hsu, Mark Hamill, Matt Berry y Ving Rhames.',
            synopsis: 'El épico viaje de un robot que naufraga en una isla y debe adaptarse al entorno, convirtiéndose en padre adoptivo de un ganso huérfano.',
            ratings: { usuarios: 4.0, sensacine: 4.5 },
            image: '/public/img/cartelera3.jpg',
          },
        ].map((movie, index) => (
          <div
            className="row bg-white shadow-lg rounded-lg overflow-hidden mb-5"
            key={index}
          >
            <div className="col-md-4">
              <img
                className="w-100 h-auto"
                src={movie.image}
                alt={`Poster de ${movie.title}`}
              />
            </div>
            <div className="col-md-8 p-4">
              <h2 className="h4">{movie.title}</h2>
              <p className="text-muted">
                {movie.releaseDate} | {movie.duration} | {movie.genres}
              </p>
              <p>
                <strong>Dirigida por:</strong> {movie.director}
              </p>
              <p>
                <strong>Reparto:</strong> {movie.cast}
              </p>
              <p className="mt-2">{movie.synopsis}</p>
              <div className="d-flex justify-content-between mt-3">
                {Object.entries(movie.ratings).map(([key, value]) => (
                  <div className="text-center" key={key}>
                    <p className="font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                    <p className="text-warning">{value} ⭐</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estrenos 2025 */}
      <div className="bg-light py-5">
        <h2 className="text-center text-underline mb-5">Las más esperadas</h2>
        <div className="container d-flex flex-wrap justify-content-center gap-4">
          {[
            {
              title: 'Capitán América: Brave New World',
              description: 'Sam se encuentra en medio de un incidente internacional mientras intenta detener un complot global.',
              image: '/public/img/pelicula1.jpg',
            },
            {
              title: 'Spider-man: Beyond the Spider-verse',
              description: 'Secuela de Spider-Man: Across the Spider-Verse (2023). Una emocionante aventura en el multiverso.',
              image: '/public/img/pelicula2.jpg',
            },
            {
              title: 'Misión: Imposible 8',
              description: 'La historia continúa tras el cliffhanger de Misión: Imposible - Sentencia Mortal (Parte 1).',
              image: '/public/img/pelicula3.jpg',
            },
          ].map((movie, index) => (
            <div className="card" style={{ width: '18rem' }} key={index}>
              <img
                src={movie.image}
                className="card-img-top"
                alt={`Poster de ${movie.title}`}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
