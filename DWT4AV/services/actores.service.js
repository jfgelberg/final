import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://admin:admin@aphibridas.eeve4.mongodb.net/");
const db = client.db("AH2023");

export async function agregarActoresPelicula(idPelicula, actores) {
    // Asegura que actores es un array válido
    if (!Array.isArray(actores) || actores.length === 0) {
        return "Debe proporcionar un array de actores válido";
    }

    // Buscamos la película por el ID
    const pelicula = await db.collection("movies").findOne({ _id: new ObjectId(idPelicula) });

    if (!pelicula) {
        return "Película no encontrada";
    }

    // Si no tiene el campo actores, inicialízalo como un array vacío
    const actoresExistentes = pelicula.actores || [];

    // Actualizamos el array de actores usando $push para agregar actores al array existente
    const resultado = await db.collection("movies").updateOne(
        { _id: new ObjectId(idPelicula) },
        { $push: { actores: { $each: actores } } } // Usamos $push con $each para agregar actores al array
    );

    // Verificamos si la operación fue exitosa
    if (resultado.modifiedCount > 0) {
        return "Actores agregados correctamente";
    } else {
        return "No se agregaron actores";
    }
}
export async function getActoresPelicula(idPelicula) {
    // Asegura la conexión antes de hacer la consulta
    const pelicula = await db.collection("movies").findOne({ _id: new ObjectId(idPelicula) });

    if (!pelicula) {
        throw new Error("Película no encontrada");
    }

    console.log(pelicula.actores); // Verificación
    return pelicula.actores || []; // Retorna un array vacío si no existen actores
}
