import React, { useContext } from 'react'
// Context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import moment from 'moment'
import 'moment/locale/es'

const Tarea = ({tarea}) => {
    // State initial de proyectos
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    // Destructuring a proyecto
    const [ proyectoActual ] = proyecto

    // State initial de tareas
    const tareasContext = useContext(tareaContext)
    const { eliminarTarea, obtenerTareas, modificarTarea, guardarTareaActual } = tareasContext

    // Función que se ejecuta al eliminar una tarea
    const handleClick = id => {
        eliminarTarea(id, proyectoActual._id)
        obtenerTareas(proyectoActual._id)
    }

    // Función que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false
        } else {
            tarea.estado = true
        }

        modificarTarea(tarea)
    }

    // Seleccion la tarea actual
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <p>{moment(tarea.creado).format('LLLL')}</p>
            <div className="estado">
                {
                    tarea.estado
                    ? 
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={ () => cambiarEstado(tarea) }
                            >Completada</button>
                        ) 
                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={ () => cambiarEstado(tarea) }
                            >Incompleta</button>
                        ) 
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => seleccionarTarea(tarea) }
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-eliminar"
                    onClick={ () => handleClick(tarea._id) }
                >
                    &times;
                </button>
            </div>
        </li>
    );
}
 
export default Tarea;