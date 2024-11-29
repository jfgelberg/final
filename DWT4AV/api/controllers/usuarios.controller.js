import * as service from "../../services/usuarios.service.js";

function createUsuario(req, res) {
  service.agregarUsuario(req.body)
      .then(usuario => res.status(201).json(usuario))
      .catch(err => res.status(400).json({ message: err.message || "Error al crear el usuario" }));
}

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "El email y la contraseña son requeridos" });
  }

  service.login({ email, password })
      .then(usuario => res.status(200).json(usuario)) // Login exitoso
      .catch(err => {
          console.error(err);
          const statusCode = err.status || 400;
          res.status(statusCode).json({ message: err.message || "No se pudo loguear" });
      });
}

function getUsuarios(req, res) {
  service.getUsuarios()
    .then(usuarios => res.status(200).json(usuarios))
    .catch(error => res.status(500).json({ message: "Error al obtener usuarios", error }));
}

function getUsuarioById(req, res) {
  const usuarioId = req.params.usuarioId; 
  service.getUsuarioById(usuarioId)
      .then(usuario => {
          if (usuario) {
              res.status(200).json(usuario);
          } else {
              res.status(404).json({ message: "Usuario no encontrado" });
          }
      })
      .catch(error => res.status(500).json({ message: "Error al obtener el usuario", error }));
}

function getFavoritos(req, res) {
  const usuarioId = req.params.usuarioId; 
  service.getFavoritos(usuarioId)
      .then(favoritos => res.status(200).json(favoritos))
      .catch(error => res.status(500).json({ message: "Error al obtener los favoritos del usuario", error }));
}

export const agregarFavorito = async (req, res) => {
  const { usuarioId, peliculaId } = req.body;

  try {
      const resultado = await service.agregarAFavoritos(usuarioId, peliculaId);
      return res.status(200).json(resultado);
  } catch (error) {
      return res.status(400).json({ message: error.message });
  }
};

export const eliminarFavorito = async (req, res) => {
    const { usuarioId, peliculaId } = req.body;

    try {
        const resultado = await service.eliminarDeFavoritos(usuarioId, peliculaId);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export {
  createUsuario,
  getUsuarios,
  getUsuarioById, 
  getFavoritos // Exportamos la nueva función
};
