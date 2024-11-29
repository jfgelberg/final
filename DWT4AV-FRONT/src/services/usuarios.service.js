import { call } from "./api.service";

// Función para obtener el perfil del usuario
export async function obtenerPerfilDeUsuario(usuarioId) {
    if (!usuarioId) {
        throw new Error("ID de usuario no proporcionado.");
    }

    try {
        const usuario = await call({ uri: `usuarios/${usuarioId}` });
        return usuario;
    } catch (error) {
        console.error("Error al obtener perfil de usuario:", error.message);
        throw error;
    }
}

// Función para eliminar un favorito
export async function eliminarFavorito(usuarioId, peliculaId) {
    if (!usuarioId || !peliculaId) {
        throw new Error("Faltan datos necesarios para eliminar un favorito.");
    }

    try {
        const respuesta = await call({
            uri: `usuarios/${usuarioId}/favoritos`,
            method: "DELETE",
            body: { usuarioId, peliculaId },
        });
        return respuesta;
    } catch (error) {
        console.error("Error al eliminar favorito:", error.message);
        throw error;
    }
}

// Función para agregar un favorito
export async function agregarFavorito(usuarioId, peliculaId) { // Cambié 'favoritoId' a 'peliculaId'
    if (!usuarioId || !peliculaId) {
        throw new Error("Faltan datos necesarios para agregar un favorito.");
    }

    try {
        const respuesta = await call({
            uri: `usuarios/${usuarioId}/favoritos`,
            method: "POST",
            body: { usuarioId, peliculaId }, // Asegúrate de enviar ambos 'usuarioId' y 'peliculaId'
        });
        return respuesta;
    } catch (error) {
        console.error("Error al agregar favorito:", error.message);
        throw error;
    }
}

// Función para obtener película por ID
export const obtenerPeliculaPorId = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No se encontró el token de autenticación.");

        const response = await fetch(`http://localhost:2025/api/peliculas/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error("Error al obtener película.");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en obtenerPeliculaPorId:", error);
        throw error;
    }
};
// Función para obtener los favoritos de un usuario
export async function getFavoritos(usuarioId) {
    if (!usuarioId) {
        throw new Error("ID de usuario no proporcionado.");
    }

    try {
        const favoritos = await call({ uri: `usuarios/${usuarioId}/favoritos` });
        return favoritos;
    } catch (error) {
        console.error("Error al obtener favoritos:", error.message);
        throw error;
    }
}
export default {
    obtenerPerfilDeUsuario,
    eliminarFavorito,
    agregarFavorito,
    obtenerPeliculaPorId,
    getFavoritos
};
