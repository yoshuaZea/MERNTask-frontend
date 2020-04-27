import React, { useReducer } from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import clienteAxios from '../../config/axios'

// Importar TYPES
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    MODIFICAR_TAREA,
    LIMPIAR_TAREA,
    TAREA_ERROR
} from '../../types'

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
        mensaje: null
    }

    // Crear el dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    // Obtener tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/tareas', { 
                params: { proyecto }
            })

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                cat: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }
    }
    
    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/tareas', tarea)
            
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })

        } catch (error) {
            // console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                cat: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }
    }

    // Validar y muestra error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Elimina una tarea del proyecto actual
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/tareas/${id}`, {
                params: { proyecto }
            })

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                cat: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }
    }

    // Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Modificar tarea actual
    const modificarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/tareas/${tarea._id}`, tarea)
            
            dispatch({
                type: MODIFICAR_TAREA,
                payload: resultado.data.tarea
            })

        } catch (error) {
            console.log(error);
        }
    }

    // Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                mensaje: state.mensaje,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                modificarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState