import yup from 'yup'

export const movieSchema = yup.object({
    rank: yup.number().positive("Debe ser un valor mayor a cero").integer(),
    id: yup.string(),
    name: yup.string().required().min(2, "El nombre debe tener al menos 2 caracteres"),
    year: yup.number().required().min(1800, "El año como mínimo debe ser 1800").max(2030, "El año como máximo puede ser 2030"),
    imbd_votes: yup.number().positive("Debe ser un valor mayor a cero"),
    imdb_rating: yup.number().positive("Debe ser un valor mayor a cero").max(6, "No puede tener más de 6 caracteres"),
    certificate: yup.string(), 
    duration: yup.number().positive("Debe ser un valor mayor a cero").min(60 ,"No puede durar menos de 60 minutos").max(300,"No puede durar más 300 minutos"),
    genre: yup.string(),
    cast_id: yup.string(),
    cast_name: yup.string(),
    director_id: yup.string(),
    director_name: yup.string(),
    writter_name: yup.string(),
    writter_id: yup.string(),
    img_link: yup.string().url(),
    actores: yup.array().of(
        yup.object({
            nombre: yup.string().required("El nombre del actor es obligatorio"),
            rol: yup.string().required("El rol del actor es obligatorio"),
            fechaNacimiento: yup.date().required("La fecha de nacimiento es obligatoria"),
            biografia: yup.string(),
            premios: yup.array().of(yup.string())
        })
    )
});
