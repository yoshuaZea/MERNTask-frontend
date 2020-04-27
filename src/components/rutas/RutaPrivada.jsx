import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'

/**
 * Permite validar si un usuario está autenticado, toma como parámetros un componente y los props
 * Se evalua dependiendo el context su hay un usuario autenticado para redireccionar al login o mostrar el componente
 */

const RutaPrivada = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext)
    const { autenticado, cargando, usuarioAutenticado } = authContext

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line
    }, [])

    return (  
        <Route 
            {...props}
            render={props => !autenticado && !cargando? ( 
                <Redirect to="/" />
            ): (
                <Component { ...props } />
            )}
        />
    );
}
 
export default RutaPrivada;
