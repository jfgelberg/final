import { call } from "./api.service";

// Función para obtener todas las películas
export async function getPeliculas() {
    return call({ uri: "peliculas" });
}

// Función para obtener una película por ID
export async function getPelicula(id) {
    return call({ uri: `peliculas/${id}` });
}

// Función para agregar una película
export async function agregarPelicula(pelicula) {
    return call({ uri: "peliculas", method: "POST", body: pelicula });
}

// Función para obtener películas filtradas por género
export async function getPeliculasConFiltros(filtros) {
    try {
        const params = new URLSearchParams(filtros).toString();
        const peliculas = await call({
            uri: `peliculas?${params}`,
            method: "GET"
        });
        return peliculas;
    } catch (error) {
        console.error("Error al obtener películas:", error);
        throw error;
    }
}

export const obtenerPeliculas = async () => {
    const response = await fetch('http://localhost:2025/peliculas');
    return await response.json();
};

// Función para modificar una película
export const modificarPelicula = async (id_ingresado, peliculaActualizada) => {
    await db.collection("movies").replaceOne({ _id: ObjectId.createFromHexString(id_ingresado)}, peliculaActualizada);
    return peliculaActualizada;
};

// Función para actualizar una película
export const actualizarPelicula = async (id, peliculaActualizada) => {
    const peliculaNueva = await db.collection("movies").updateOne({_id: ObjectId.createFromHexString(id)}, { $set: peliculaActualizada });
    return peliculaNueva;
};

export default {
    getPeliculas,
    getPelicula,
    agregarPelicula,
    getPeliculasConFiltros
};
