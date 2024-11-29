import React from "react";
import Hola from "./components/Hola";
import List from "./components/Listado/List";
import { Button } from 'react-bootstrap';
import ContenedorImage from "./components/Carousel/ContenedorImage";
import Contador from "./components/Contador/Contador";
import FetchList from "./components/Fetch/FetchList";
import Login from "./components/Login/Login";




function App() {
  //----------------------------------------
  //ejecutar todo el codigo de la aplicacion (js)

  console.log('hola mundo')
  const nombre = 'Pepe Chanfas';

  const estilosCss = { color: "lightblue", fontWeight: 900, backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')" }

  const usuarios = [
    ];

  const imagenes = [
    { src:'./img/img_01.jpg', alt: 'imagen 01 auto', label: 'Escudería Ferrari 01 ', description: 'Auto Ferrari 01' },
    { src:'./img/img_02.jpg', alt: 'imagen 02 auto', label: 'Escudería Ferrari 02', description: 'Auto Ferrari 02' },
    { src:'./img/img_03.jpg', alt: 'imagen 03 auto', label: 'Escudería Williams 01', description: 'Auto Williams' }
  ];

  //----------------------------------------

  return (

    <div>
      {/* <h1>Usuarios</h1> */}
      {/* llamo al componente List */}
       {/* <List /> */}

        {/* <p>Recorriendo Usuarios</p> */}
        {/* <Hola name={nombre} lastName={"mio"} /> */}
        {/* <Button variant="info" style={{ width: '150px' }} >Color info</Button> */}

        {/* <ContenedorImage imagenes={imagenes} /> */}

        {/* Clase ---> 16/10/2024  / metodo hover y suma los hovers */}
        <Login />
        {/* <Contador />
        <FetchList /> */}
      

    </div>
  );
}

export default App;
