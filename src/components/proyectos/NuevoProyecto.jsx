import React, { Fragment, useState, useContext } from 'react'

// Context
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    // Obtener state del formulario, consumiendo context y reducer
    const proyectosContext = useContext(proyectoContext)

    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext

    // State para proyecto
    const [proyecto, setProyecto] = useState({
        nombre: '',
    })

    // Destructuring
    const { nombre } = proyecto

    // Funciones
    const handleChange = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Validar proyecto
        if(nombre === ''){
            mostrarError()
            document.querySelector('input[name="nombre"]').focus()
            return
        }

        // Agregar al state
        agregarProyecto(proyecto)

        // Reiniciar el form
        setProyecto({
            nombre: ''
        })
    }

    // Mostrar formulario
    const onClickForm = () => mostrarFormulario()

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickForm}
            >
                Nuevo proyecto
            </button>

            {
                formulario ? 
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={handleSubmit}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="¿Cómo se llama el proyecto?"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar"
                            />
                        </form>
                    )
                : null
            }

            {
                errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>: null
            }
        </Fragment>
    )
}
 
export default NuevoProyecto