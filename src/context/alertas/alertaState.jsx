import React, { useReducer } from 'react'
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types'

const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    // Crear el reducer
    const [state, dispatch] = useReducer(alertaReducer, initialState)

    // Mostrar alerta
    const mostrarAlerta = (msg, cat) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                cat
            }
        })

        // Limpia la alerta despues de un tiempo
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }

    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState
