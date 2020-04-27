import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Tarea from './Tarea'

// Context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const ListadoTareas = () => {

    // Definir el context desde el state initial y extraer el proyecto
    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { tareasproyecto } = tareasContext

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    
    // Array destructuring para extraer proyecto actual de la primer posición [0]
    const [proyectoActual] = proyecto

    const handleClick = () => eliminarProyecto(proyectoActual._id)

    return ( 
        <Fragment>
            <div className="main-project ">
                <h2>Proyecto: {proyectoActual.nombre} </h2>
                <button
                    type="button"
                    className="btn btn-eliminar"
                    onClick={handleClick}
                >
                    Eliminar proyecto &times;
                </button>
            </div>
            <ul className="listado-tareas">
                {   
                    tareasproyecto.length === 0
                    ? ( 
                        <li className="tarea"><p>Aún no hay tareas</p></li>
                    ) :  
                        <TransitionGroup>
                            {
                                tareasproyecto.map(tarea => (
                                    <CSSTransition
                                        key={tarea._id}
                                        classNames="tarea"
                                        timeout={200}
                                    >
                                        <Tarea
                                            tarea={tarea}
                                        />
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                    
                }
            </ul>
        </Fragment>
    )
}
 
export default ListadoTareas