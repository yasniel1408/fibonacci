import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import Header from './componentes/Header';
import HomeRuta from './rutas/HomeRuta.js'
import TablaResultadosRuta from './rutas/TablaResultadosRuta.js';

// const HomeRuta = React.lazy(() => import('./rutas/HomeRuta'));
// const TablaResultadosRuta = React.lazy(() => import('./rutas/TablaResultadosRuta'));


class App extends React.Component {

  render(){
    return (

      <div className="App">
          <Header/>

          <div className="Tarjeta">
          
              <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={HomeRuta}/>
                        <Route path="/tablaresultados" component={TablaResultadosRuta}/>
                    </Switch>
                </Suspense>
              </Router>

          </div>

      </div>

    );
  }

}

export default App;





    
    
    


