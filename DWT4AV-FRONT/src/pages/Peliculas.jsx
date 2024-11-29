import React,{ useEffect, useState } from 'react'
import ListadoPeliculas from '../components/Peliculas/ListadoPeliculas'
import * as servicePeliciulas from '../services/peliculas.service'

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState([])

    useEffect( () => {
        servicePeliciulas.getPeliculas()
        .then( peliculas => {
            setPeliculas(peliculas)
        })
    },[] )

    return (
        <ListadoPeliculas listado={peliculas}  />
    )
}

export default Peliculas