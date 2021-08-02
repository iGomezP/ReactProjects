// Se usa react-router-dom para el manejo de múltiples páginas principales
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// ¬ Context
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/autenticacion/AuthState';

// ¬ Componentes
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

// ¬ Otros
import TokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

// Revisar si tenemos un token
const token = localStorage.getItem( 'token' );
if ( token ) {
  TokenAuth( token );
}


function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={ Login } />
                <Route exact path="/nueva-cuenta" component={ NuevaCuenta } />
                {/* Aquí se le hace el llamado al Higher Order Component "Ruta Privada" */ }
                {/* El HOC toma dentro de él el componente "Proyectos" y evalúa si el usuario está autenticado o no */ }
                <RutaPrivada exact path="/proyectos" component={ Proyectos } />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
