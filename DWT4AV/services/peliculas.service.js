import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@aphibridas.eeve4.mongodb.net/");
const db = client.db("AH2023");

async function getPeliculas(filtros = {}) {
    const filterMongo = { eliminado: { $ne: true } }

    // Cambiar el filtro de tematica por genre
    if (filtros.genre !== undefined) {
        filterMongo.genre = { $eq: filtros.genre }
    }
    
    if (filtros.puntuacionMayorQue !== undefined || filtros.puntuacionMenorQue !== undefined) {
        filterMongo.$and = [
            { puntuacion: { $gt: parseInt(filtros.puntuacionMayorQue) } },
            { puntuacion: { $lt: parseInt(filtros.puntuacionMenorQue) } }
        ]
    }
    
    if (filtros.descripcion !== undefined) {
        filterMongo.$text = { $search: filtros.descripcion }
    }
    
    await client.connect()
    return db.collection("movies").find(filterMongo).toArray()
}

async function getPeliculaId(id_ingresado) {
    await client.connect()
    console.log("id recibido", id_ingresado)
    const datos = await db.collection("movies").findOne({ _id: ObjectId.createFromHexString(id_ingresado) })  
    return datos 
}

async function agregarPelicula(pelicula) {
    console.log(pelicula)
    await client.connect()
    await db.collection("movies").insertOne(pelicula)
    return pelicula
}

async function eliminarPelicula(id_ingresado) {
    await client.connect();

    // Eliminar el documento correspondiente al ID ingresado
    const resultado = await db.collection("movies").deleteOne({
        _id: ObjectId.createFromHexString(id_ingresado)
    });

    if (resultado.deletedCount === 0) {
        throw new Error(`No se encontró ninguna película con el ID: ${id_ingresado}`);
    }

    return {
        mensaje: "Película eliminada exitosamente",
        id: id_ingresado
    };
}

const modificarPelicula = async (id_ingresado, peliculaActualizada) => {
    await client.connect();

    // Eliminar el campo `_id` del objeto actualizado
    if (peliculaActualizada._id) {
        delete peliculaActualizada._id;
    }

    // Reemplazar el documento en la base de datos
    const resultado = await db.collection("movies").replaceOne(
        { _id: ObjectId.createFromHexString(id_ingresado) }, 
        peliculaActualizada
    );

    return resultado;
};

const actualizarPelicula = async (id, peliculaActualizada) => {
    await client.connect();

    // Eliminar el campo `_id` del objeto actualizado
    if (peliculaActualizada._id) {
        delete peliculaActualizada._id;
    }

    // Actualizar campos específicos usando `$set`
    const resultado = await db.collection("movies").updateOne(
        { _id: ObjectId.createFromHexString(id) }, 
        { $set: peliculaActualizada }
    );

    return resultado;
};

export {
    getPeliculaId,
    getPeliculas,
    agregarPelicula,
    eliminarPelicula,
    modificarPelicula,
    actualizarPelicula
}
