import * as service from '../../services/actores.service.js';

export async function getActoresPelicula(req, res) {
    const idPelicula = req.params.idPelicula;

    try {
        const actores = await service.getActoresPelicula(idPelicula);
        if (!actores) {
            return res.status(404).json({ error: 'Película no encontrada o no tiene actores' });
        }
        res.status(200).json(actores);
    } catch (error) {
        console.error(error); // Es útil ver los errores en el servidor para depuración
        res.status(500).json({ error: 'Error al obtener los actores' });
    }
}

export async function agregarActoresPelicula(req, res) {
    const idPelicula = req.params.idPelicula;
    const actores = req.body;

    try {
        if (!Array.isArray(actores) || actores.length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar un array de actores' });
        }
        
        const result = await service.agregarActoresPelicula(idPelicula, actores);
        
        if (result === "No se agregaron actores") {
            return res.status(404).json({ error: 'No se encontraron actores para agregar' });
        }

        res.status(201).json({ message: 'Actores agregados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar los actores' });
    }
}
