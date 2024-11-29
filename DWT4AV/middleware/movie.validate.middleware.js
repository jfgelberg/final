import { movieSchema } from "../schemas/movies.validate.js"

//abortEarly: false para que muestre todos los errores
//stripUnknown: true para que elimine los campos que no estén en el schema

export async function validateMovie(req, res, next) {
    try {
        const datosValidados = await movieSchema.validate(req.body, { abortEarly: false, stripUnknown: true})
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({ Respuesta: error.errors })
    }
    
}