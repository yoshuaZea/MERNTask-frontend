import React from 'react'
/**
 * <Router> - 
 * <Switch> - Todo lo que se coloque dentro son las diferentes páginas donde habrá navegación, lo que está por fuera son las paginas visibles para todos
 */
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// Componentes
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'

// Importar Context
import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/autenticacion/authState'
import authToken from './config/authToken'
import RutaPrivada from './components/rutas/RutaPrivada'

// Revisar si tenemos un token
const token = localStorage.getItem('token')
if(token) authToken(token)


function App() {
  return (
    <ProyectoState>
      <TareaState>
          <AlertaState>
              <AuthState>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                    <RutaPrivada exact path="/proyectos" component={Proyectos}/>
                  </Switch>
                </Router>
              </AuthState>
          </AlertaState>
      </TareaState>
    </ProyectoState>
  )
}

export default App
