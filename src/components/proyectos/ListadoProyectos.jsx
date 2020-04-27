import React, { useEffect, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// Componentes y context
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import AlertaContext from '../../context/alertas/alertaContext'

const ListadoProyectos = () => {

    // Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext)
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Obtener proyectos cuando cargue el componente
    useEffect(() => {
        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.cat)
        obtenerProyectos()
        // eslint-disable-next-line
    }, [mensaje])

    // Si hay contenido en los proyectos
    if(proyectos.length === 0) return <p className="no-projects">No hay proyectos, comienza creando uno!</p>

    return ( 
        <ul className="listado-proyectos">

            { alerta ? <div className={`alerta ${alerta.cat}`}>{alerta.msg}</div> : null }

            <TransitionGroup>
                {
                    proyectos.map(proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            classNames="proyecto"
                            timeout={200}
                        >
                            <Proyecto
                                key={proyecto._id}
                                proyecto={proyecto}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ul>
    ) 
}
 
export default ListadoProyectos