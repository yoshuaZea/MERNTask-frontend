import React, { useReducer } from 'react'
import AuthReducer from './authReducer'
import AuthContext from './authContext'
import clienteAxios from '../../config/axios'
import authToken from '../../config/authToken'
import { REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION } from '../../types'

const AuthState = props => {
    // State inicial
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    // Crear el reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // Registro de usuario
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/usuarios', datos)

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            // Obtener usuario
            usuarioAutenticado()

        } catch (error) {
            // console.log(error.response)
            const alerta = {
                msg: error.response.data.msg,
                cat: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if(token) authToken(token)

        try {
            const respuesta = await clienteAxios.get('/auth')

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })

        } catch (error) {
            // console.log(error.response)
            const alerta = {
                msg: error.response.data.msg,
                cat: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Iniciar sesión
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/auth', datos)

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            // Obtener usuario
            usuarioAutenticado()

        } catch (error) {
            // console.log(error.response)
            const alerta = {
                msg: error.response.data.msg,
                cat: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión de un usuario autenticado
    const cerrarSesion = async datos => {
        dispatch({
            type: CERRAR_SESION
        })
    }
 


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState