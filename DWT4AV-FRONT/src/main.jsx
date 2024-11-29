import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.jsx'
//import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//rutas de mi aplicacion-------------------------
import Login from "./components/Login/Login";
import Register from './components/Login/Register.jsx';
import Logout from './components/Login/Logout.jsx';
import Peliculas from './pages/Peliculas.jsx';
import Home from './pages/Home.jsx';
import Perfil from './pages/Perfil.jsx';
// import Actores from './pages/Actores.jsx';
import ProtectedRoute from './components/Rutas/ProtectedRoute.jsx';
import Layout from './components/Layout/Layout.jsx';
import DetallePelicula from './components/Peliculas/DetallePelicula.jsx';
import NuevaPelicula from './pages/NuevaPelicula.jsx';
import Editar from './pages/Editar.jsx';
import Eliminar from './pages/Eliminar.jsx';
//------------------------------------------------

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute> <Home /> </ProtectedRoute>,
      },
      {
        path: "/peliculas",
        element: <ProtectedRoute> <Peliculas /> </ProtectedRoute>,
      },
      {
        path: "/peliculas/pelicula/:id",
        element: <ProtectedRoute> <DetallePelicula /> </ProtectedRoute>,
      },
      {
        path: "/peliculas/nuevaPelicula",
        element: <ProtectedRoute> <NuevaPelicula /> </ProtectedRoute>,
      },
      {
        path: "/peliculas/peliculaCargada",
        element: <ProtectedRoute> <peliculaCargada /> </ProtectedRoute>,
      },
      {
        path: "/peliculas/editar/:id",
        element: <ProtectedRoute> <Editar /> </ProtectedRoute>,
      },
      {
        path: "/peliculas/eliminar/:id",
        element: <ProtectedRoute> <Eliminar /> </ProtectedRoute>,
      },
      {
        path: "/mi-perfil",
        element: <ProtectedRoute> <Perfil /> </ProtectedRoute>,
      },   
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: <Logout />
      },
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
