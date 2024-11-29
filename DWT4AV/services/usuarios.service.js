import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { crearToken } from './token.service.js';

const client = new MongoClient("mongodb+srv://admin:admin@aphibridas.eeve4.mongodb.net/"); 
const db = client.db("AH2023");

const usuarios = db.collection("usuarios");

async function connectDB() {
    await client.connect();
}

async function getUsuarios() {
    await connectDB();
    return db.collection("usuarios").find().toArray();
}

async function getUsuarioById(id) {
    await connectDB();
    if (!ObjectId.isValid(id)) {
        throw new Error("ID inválido");
    }
    return db.collection("usuarios").findOne({ _id: new ObjectId(id) });
}

async function agregarUsuario(usuario) {
    await connectDB();

    // Verifica si el usuario ya existe
    const existe = await db.collection("usuarios").findOne({ email: usuario.email });

    if (existe) {
        throw new Error("La cuenta ya existe");
    }

    // Hashea la contraseña antes de guardar
    const nuevoUsuario = {
        ...usuario,
        password: await bcrypt.hash(usuario.password, 10),
    };

    // Elimina el campo passwordConfirm antes de guardar
    delete nuevoUsuario.passwordConfirm;

    // Inserta el nuevo usuario
    const resultado = await db.collection("usuarios").insertOne(nuevoUsuario);

    return { id: resultado.insertedId, ...nuevoUsuario };
}

// Nueva función para obtener un usuario por email
async function obtenerUsuarioPorEmail(email) {
    await connectDB();
    return db.collection("usuarios").findOne({ email });
}

export async function login({ email, password }) {
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
        throw { status: 404, message: "Usuario no encontrado" };
    }

    // Comparar contraseñas usando bcrypt
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
        throw { status: 401, message: "Contraseña incorrecta" };
    }

    const token = await crearToken(usuario);

    return {
        message: "Login exitoso",
        token,
        usuario: {
            id: usuario._id,
            email: usuario.email
        },
    };
}

async function eliminarUsuario(id) {
    await connectDB();
    await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });
    return id;
}

async function getPeliculasPorUsuario(usuarioId) {
    await connectDB();
    const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(usuarioId) });

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return db.collection("movies").find({
        _id: { $in: usuario.peliculas.map(id => new ObjectId(id)) }
    }).toArray();
}

// Nueva función para agregar una película a favoritos
async function agregarAFavoritos(usuarioId, peliculaId) {
    await connectDB();

    // Verificar que el usuario exista
    const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(usuarioId) });
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    // Verificar que la película exista en la colección de películas
    const pelicula = await db.collection("movies").findOne({ _id: new ObjectId(peliculaId) });
    if (!pelicula) {
        throw new Error("Película no encontrada");
    }

    // Verificar si la película ya está en los favoritos del usuario
    if (usuario.favoritos && usuario.favoritos.includes(peliculaId)) {
        throw new Error("La película ya está en tus favoritos");
    }

    // Agregar la película a los favoritos del usuario
    const resultado = await db.collection("usuarios").updateOne(
        { _id: new ObjectId(usuarioId) },
        { $push: { favoritos: new ObjectId(peliculaId) } } // $push agrega el ID de la película al array de favoritos
    );

    if (resultado.modifiedCount === 0) {
        throw new Error("No se pudo agregar la película a favoritos");
    }

    return { message: "Película agregada a favoritos" };
}

// Nueva función para eliminar una película de favoritos
async function eliminarDeFavoritos(usuarioId, peliculaId) {
    await connectDB();

    // Verificar que el usuario exista
    const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(usuarioId) });
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    // Convertir peliculaId a ObjectId
    const peliculaObjectId = new ObjectId(peliculaId);

    // Verificar si la película está en los favoritos del usuario
    if (!usuario.favoritos || !usuario.favoritos.some(id => id.equals(peliculaObjectId))) {
        throw new Error("La película no está en tus favoritos");
    }

    // Eliminar la película de los favoritos del usuario
    const resultado = await db.collection("usuarios").updateOne(
        { _id: new ObjectId(usuarioId) },
        { $pull: { favoritos: peliculaObjectId } } // $pull elimina el ID de la película del array de favoritos
    );

    if (resultado.modifiedCount === 0) {
        throw new Error("No se pudo eliminar la película de favoritos");
    }

    return { message: "Película eliminada de favoritos" };
}

async function getFavoritos(usuarioId) {
    await connectDB();
    const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(usuarioId) });

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return usuario.favoritos || [];
}

export {
    getUsuarios,
    getUsuarioById,
    agregarUsuario,
    eliminarUsuario,
    getFavoritos, // Exportamos la nueva función
    agregarAFavoritos,
    eliminarDeFavoritos
};
