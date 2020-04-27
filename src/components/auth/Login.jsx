import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {
    // Importar el context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Context de autenticación
    const authContext = useContext(AuthContext)
    const { autenticado, mensaje, iniciarSesion } = authContext

    // State para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    // Extraer datos de usuario
    const { email, password } = usuario

    // En caso que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        // Si se autentica
        if(autenticado) props.history.push('/proyectos')
        if(mensaje){
            mostrarAlerta(mensaje.msg, 'alerta-error')
            setUsuario({
                email: '',
                password: ''
            })
        } 
        // eslint-disable-next-line        
    }, [mensaje, autenticado, props.history])


    // Funciones
    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Validación para que no haya campos vacíos
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Email y password son obligatorios para iniciar sesión', 'alerta-error')
        }

        // Pasar al action
        iniciarSesion({ email, password })

    }

    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.cat}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Ingresa tu email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Ingresa tu password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión"
                        />
                    </div>
                </form>

                <Link 
                    to={'/nueva-cuenta'}
                    className="enlace-cuenta"
                >
                    Obtener una cuenta
                </Link> 
            </div>
        </div>
    )
}
 
export default Login;