import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/autenticacion/authContext'

const Header = () => {

    // Extraer información de autenticación
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line
    }, [])

    // Cierra la sesión del usuario
    const handleChange = () => cerrarSesion()

    return ( 
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null }
            <nav className="nav-principal">
                <button
                    type="button"
                    className="btn cerrar-sesion"
                    onClick={handleChange}
                >
                    Cerrar sesión
                </button>
            </nav>
        </header>
    )
}
 
export default Header;