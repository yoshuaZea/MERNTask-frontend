import React, { useContext } from 'react'

// Context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({proyecto}) => {

    // Obtener state de proyectos
    const proyectosContext = useContext(proyectoContext)
    const { proyectoActual } = proyectosContext

    // Obtener la función del context tareas
    const tareasContext = useContext(tareaContext)
    const { obtenerTareas } = tareasContext

    // Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id) // Filtrar proyecto actual
        obtenerTareas(id) // Filtrar tareas 
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () =>  seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    )
}
 
export default Proyecto 