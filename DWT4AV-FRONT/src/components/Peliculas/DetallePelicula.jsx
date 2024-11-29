import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
//import * as servicePelicula from '../../services/peliculas.service'

const DetallePelicula = () => {

  const [pelicula, setPelicula] = useState({})
  const { id } = useParams()

 
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
  },[])

  return (

    <div className="container my-5">
      <div className="row g-3">
        <div className="col-md-12 col-sm-12 col-12">
          <div className="card h-100 d-flex flex-column">
            <img
              src={pelicula.img_link}
              className="card-img-top"
              alt={pelicula.name}
              style={{ height: '300px', objectFit: 'cover', width: '100%' }} // Imagen uniforme
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
                <p className="card-text">⭐ {pelicula.imdb_rating}({pelicula.imbd_votes} votos)</p>
              </div>

              {/* Botón alineado al final */}
              <div className="mt-auto">
                <Link to={"/peliculas"} className="btn btn-info w-100">Volver</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default DetallePelicula