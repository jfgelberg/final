import { Router } from 'express';
import { createUsuario, getFavoritos, getUsuarioById, login, agregarFavorito, eliminarFavorito } from '../controllers/usuarios.controller.js';
import { validateUser, validateLogin } from '../../middleware/usuario.validate.middleware.js';
import { validateToken } from "../../middleware/token.validate.middleware.js";

const router = Router();

router.post('/usuarios', [validateUser], createUsuario);
router.post('/usuarios/login', [validateLogin], login);
router.get('/usuarios/:usuarioId', [validateToken], getUsuarioById);
router.get('/usuarios/:usuarioId/favoritos', [validateToken], getFavoritos); // Actualizamos la ruta para obtener los favoritos
router.post('/usuarios/:usuarioId/favoritos', [validateToken], agregarFavorito);
router.delete('/usuarios/:usuarioId/favoritos', [validateToken], eliminarFavorito);

export default router;
