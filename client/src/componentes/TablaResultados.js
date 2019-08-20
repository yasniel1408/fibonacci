import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class TablaResultados extends React.Component {
    constructor() {
        super();
        this.state = { 
            list:[]
         };
    }

    componentDidMount(){
        axios.get('/secuencia/list')
            .then(response=> this.setState({list: response.data}))
            .catch(err=>console.error(err))
    }
    

    renderListado = ({id, paso, secuencia}) => <li className="list-group-item" key={id}>Paso: {paso}, Valor: {secuencia}</li>

    render() {
        return (
        <div>
            <div className="container divformulario col-xs-11 col-sm-10 col-md-6">
                <Link to="/" className="App-link" >Volver</Link>
                <h2 className="blanco">Tabla de Resultados</h2>
                    <ul className="list-group" id="lista">
                        {this.state.list.map(this.renderListado)}
                    </ul>
            </div>
        </div>
        );
    }
}

export default TablaResultados;


