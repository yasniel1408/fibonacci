import React from 'react';
// import {Link, withRouter} from 'react-router-dom'
import logo from '../logo.svg';
// import HomeRuta from '../rutas/HomeRuta.js'
// import TablaResultadosRuta from '../rutas/TablaResultadosRuta.js';
// import FinalizadoRuta from '../rutas/FinalizadoRuta.js';

class Header extends React.Component {

    render() {
        return (
            <div className="">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>Secuencia de Fibonacci.</h3>
                    <h5>con React.</h5>
                </header>
                

            </div>

            
        );
    }
}

export default Header;