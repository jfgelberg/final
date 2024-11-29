import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import of useNavigate
import FormularioPelicula from '../components/Peliculas/FormularioPelicula';
import * as servicePeliculas from '../services/peliculas.service';

const NuevaPelicula = () => {
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' }); // Estado para la alerta
  const navigate = useNavigate(); // useNavigate hook initialization

  // Función para cerrar la alerta manualmente
  const handleCloseAlert = () => {
    setAlerta({ mensaje: '', tipo: '' });
  };

  const handleAddPelicula = async (pelicula) => {
    try {
      const response = await servicePeliculas.agregarPelicula(pelicula);
      console.log("Película agregada:", response);

      // Muestra alerta de éxito
      setAlerta({
        mensaje: 'Película agregada correctamente.',
        tipo: 'success',
        className: 'bg-success text-white',
      });

      // Espera 3 segundos antes de redirigir
      setTimeout(() => {
        navigate('/peliculas'); // Redirige a la página de películas
      }, 3000);

      // Oculta la alerta automáticamente después de 5 segundos
      setTimeout(() => {
        handleCloseAlert();
      }, 3000); // 3 segundos
    } catch (error) {
      console.error("Error al agregar película:", error);

      // Muestra alerta de error
      setAlerta({
        mensaje: 'Error al agregar la película. Intenta nuevamente.',
        tipo: 'danger',
        className: 'bg-danger text-white',
      });

      // Oculta la alerta automáticamente después de 5 segundos
      setTimeout(() => {
        handleCloseAlert();
      }, 5000); // 5 segundos
    }
  };

  return (
    <div className="container my-5">
      {/* Muestra la alerta si hay un mensaje */}
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

      <FormularioPelicula onSubmit={handleAddPelicula} />
    </div>
  );
};

export default NuevaPelicula;