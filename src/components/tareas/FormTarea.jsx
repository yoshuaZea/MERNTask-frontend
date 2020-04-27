import React, { useContext, useState, useEffect } from 'react'

// Context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import AlertaContext from '../../context/alertas/alertaContext'

const FormTarea = () => {
    // Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { errortarea, tareaseleccionada, mensaje,  agregarTarea, validarTarea, obtenerTareas, modificarTarea, limpiarTarea } = tareasContext

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.cat)
        
        if(tareaseleccionada !== null){
            setTarea(tareaseleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }

        // eslint-disable-next-line
    }, [tareaseleccionada, mensaje])

    // State del formulario
    const [tarea, setTarea] = useState({
        nombre: '',
    })

    // Destructuring
    const { nombre } = tarea

    // Si no hay proyecto seleccionado
    if(!proyecto) return null

    // Destructuring a proyecto
    const [ proyectoActual ] = proyecto
    
    // Leer valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Validar
        if(nombre.trim() === ''){
            validarTarea()
            return
        }

        if(tareaseleccionada === null){
            // Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id
            agregarTarea(tarea)
        } else {
            // Actualiza tarea seleccionada
            modificarTarea(tarea)

            // Elimina tarea seleccionada del state
            limpiarTarea()
        }

        // Obtener y filtrar tareas del proyecto actual
        obtenerTareas(proyectoActual._id)

        // Reiniciar el form
        setTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            { alerta ? <div className={`alerta ${alerta.cat}`}>{alerta.msg}</div> : null }
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="¿Cuál es la nueva tarea?"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-block btn-submit btn-primario"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            { errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
        </div> 
    );
}
 
export default FormTarea;