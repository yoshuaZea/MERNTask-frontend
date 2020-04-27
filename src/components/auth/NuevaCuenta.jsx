import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {
    // Importar el context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Context de autenticación
    const authContext = useContext(AuthContext)
    const { autenticado, mensaje, registrarUsuario } = authContext

    // En caso que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        // Si se autentica
        if(autenticado) props.history.push('/proyectos')
        if(mensaje) mostrarAlerta(mensaje.msg, 'alerta-error')
        // eslint-disable-next-line        
    }, [mensaje, autenticado, props.history])

    // State para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    // Extraer datos de usuario
    const { nombre, email, password, confirmar } = usuario


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
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }
        
        // Password mínimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe contenar al menos 6 caracteres', 'alerta-error')
            return
        }
        
        // Passwords iguales
        if(password !== confirmar){
            mostrarAlerta('Los password no coinciden', 'alerta-error')
            return
        }

        // Pasar al action
        registrarUsuario({ 
            nombre, 
            email, 
            password 
        })
    }

    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.cat}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Ingresa tu nombre"
                            onChange={handleChange}
                        />
                    </div>
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
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Ingresa tu password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrar"
                        />
                    </div>
                </form>

                <Link 
                    to={'/'}
                    className="enlace-cuenta"
                >
                    Volver a iniciar sesión
                </Link> 
            </div>
        </div>
    )
}
 
export default NuevaCuenta;