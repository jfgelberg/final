import express from "express"
import * as controllerPelicula from "../controllers/peliculas.controller.js"
//import { validateMovie } from "../middleware/movie.validate.middleware.js"

const route = express.Router()
route.get("/peliculas", controllerPelicula.getPeliculas)
route.get("/peliculas/nuevo", controllerPelicula.nuevaPelicula)
route.post("/peliculas/nuevo", controllerPelicula.agregarPelicula)

//agrego el middleware de validación en peliculas post
//route.post("/peliculas", [ validateMovie ], controllerPelicula.agregarPelicula)

route.get("/peliculas/eliminar/:id", controllerPelicula.eliminarPelicula)
route.get("/peliculas/modificar/:id", controllerPelicula.modificarPeliculaForm)
route.post("/peliculas/modificar/:id", controllerPelicula.modificarPelicula)
route.get("/peliculas/:id", controllerPelicula.getPeliculaId) // localhost:2025/peliculas/1

export default route