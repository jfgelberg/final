import * as yup from "yup";

export const usuarioSchema = yup.object({
    email: yup.string().email("El correo no tiene un formato válido")
        .required("El email es obligatorio"),
    password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener menos de 16 caracteres")
        .matches(/[0-9]/, "La contraseña debe tener al menos un número")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
        .required("La contraseña es obligatoria"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
        .required("La confirmación de la contraseña es obligatoria"),
    age: yup.number().integer("La edad debe ser un número entero")
        .min(18, "Debes tener al menos 18 años")
}).strict(true); 

export const loginSchema = yup.object({
    email: yup.string().email("El correo no tiene un formato válido").required("El correo es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria"),
});



// import * as yup from "yup";

// export const usuarioSchema = yup.object({
//     email: yup.string().email("El correo no tiene un formato válido")
//         .required("El email es obligatorio"),
//     password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres")
//         .max(16, "La contraseña debe tener menos de 16 caracteres")
//         .matches(/[0-9]/, "La contraseña debe tener al menos un número")
//         .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
//         .required("La contraseña es obligatoria"),
//     passwordConfirm: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
//         .required("La confirmación de la contraseña es obligatoria"),
//     age: yup.number().integer("La edad debe ser un número entero")
//         .min(18, "Debes tener al menos 18 años")
//         .required("La edad es obligatoria"),
        
//     // Campo favoritos: validación de que es un array de IDs válidos (puede ser de tipo string o ObjectId si usas MongoDB)
//     favoritos: yup.array()
//         .of(yup.string().matches(/^[0-9a-fA-F]{24}$/, "ID de película no válido")) // Validar que cada ID tiene el formato de ObjectId de MongoDB
//         .optional() // Puede ser opcional (si no siempre se incluye en el registro del usuario)
// }).strict(true);

// export const loginSchema = yup.object({
//     email: yup.string().email("El correo no tiene un formato válido").required("El correo es obligatorio"),
//     password: yup.string().required("La contraseña es obligatoria"),
// });
