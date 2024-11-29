import { usuarioSchema, loginSchema } from "../schemas/usuario.validate.js";

export async function validateUser(req, res, next) {
    try {
        const datosValidados = await usuarioSchema.validate(req.body, { abortEarly: false, stripUnknown: true, });
        req.body = datosValidados;
        next();
    } catch (error) {
        res.status(400).json({ 
            message: "Errores de validación", 
            errores: error.errors 
        });
    }
}

export async function validateLogin(req, res, next) {
    try {
        // Validación con el esquema de login
        const datosValidados = await loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        req.body = datosValidados;  // Solo asignar los datos validados al body
        next();  // Llamar al siguiente middleware o controlador
    } catch (error) {
        // Si hay errores, devolverlos con el código 400
        res.status(400).json({
            message: "Errores de validación",
            errores: error.errors  // Aquí se mostrarán los errores de Yup
        });
    }
}