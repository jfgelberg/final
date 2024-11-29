import express from "express"
import peliculasRoute from "./routes/peliculas.routes.js"
import apiPeliculas from "./api/routes/peliculas.routes.js"
import apiActores from "./api/routes/actores.routes.js"
import apiCines from "./api/routes/cines.routes.js"
import usuariosRoute from "./api/routes/usuarios.routes.js"
import cors from "cors" //importamos el cors 

const app = express()
// let contador = 0

// app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

const corsOptions = {
    origin: "http://localhost:5173", //permite el acceso a la api solo desde esta url
    methods: "GET,POST,PUT,DELETE", // los metodos que se permiten en la api/bbdd
}

app.use(cors(corsOptions)) //activamos el cors

app.use("/api",apiPeliculas)
app.use("/api", apiActores)
app.use("/api", apiCines)
app.use("/api", usuariosRoute)
app.use(peliculasRoute)

app.listen(2025, () => console.log("Servidor funcionando"))