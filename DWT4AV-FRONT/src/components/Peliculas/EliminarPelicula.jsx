import React from 'react';
import { useNavigate } from 'react-router-dom';

function EliminarPelicula({ pelicula }) {
  const navigate = useNavigate();

  const handleEliminar = async () => {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la película "${pelicula.name}"?`);
    if (confirmacion) {
      try {
        const response = await fetch(`http://localhost:2025/peliculas/${pelicula._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Película eliminada exitosamente.');
          navigate('/peliculas'); // Redirige a la página principal o donde prefieras
        } else {
          alert('Error al eliminar la película.');
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al intentar eliminar la película.');
      }
    }
  };

  return (
    <div className="card h-100 d-flex flex-column">
      <img
        src={pelicula.img_link}
        className="card-img-top"
        alt={pelicula.name}
        style={{ height: '300px', objectFit: 'cover', width: '100%' }}
      />
      <div className="card-body d-flex flex-column">
        <p className="card-title fs-4 text-primary">
          <strong>{pelicula.name}</strong>
        </p>
        <div className="mt-auto">
          <button onClick={handleEliminar} className="btn btn-danger w-100">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarPelicula;