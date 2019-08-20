import React from 'react'
import './form.css';
import f from '../f.png';
import axios from "axios"
import { setInterval, clearInterval } from 'timers';
import {Link} from 'react-router-dom'


class FormInputNumber extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null,
            list: [],
            hist: false,
            data: [],
            secuenciaFin: false
        };
        this.i = 0
        this.timerID = null
        this.verifHist = false
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.empezar = this.empezar.bind(this);
        this.borrarHistorial = this.borrarHistorial.bind(this);
        this.botonLimparHistorial = this.botonLimparHistorial.bind(this);
    }

    borrarHistorial(){
        this.verifHist = false;
        this.i = 0
        axios.delete('/secuencia/delete')
            .catch(err=>console.error(err))
        this.setState({list:[]})
        this.setState({data:[]})
        this.setState({value:null})
        this.setState({hist:false})
        this.setState({secuenciaFin:false})
    }

    componentWillUpdate(){
        if(this.state.list.length > 0){
            this.verifHist = true
        }else{
            this.verifHist = false
        } 
    }

    devolverIteracion(){
        if(this.i < this.state.list.length){
            axios.get('/secuencia/get/'+this.i)
            .then(response=>{
                this.setState({data: response.data})
            })
            .catch(err=>console.error(err))
            this.i =  this.i + 1 
        }else{
            clearInterval(this.timerID);                        
            this.setState({secuenciaFin: true})
        }
    }

    handleChange(event) {
        this.setState({fibonacci: event.target.value});
    }

    botonLimparHistorial(){
        clearInterval(this.timerID); 
        this.devolverLista();
        if(this.state.list.length > 0){
            this.verifHist = true
        } 
        if(this.verifHist === true){
            return(
                <div>
                    <input type="submit" className="btn btn-danger" onClick={this.borrarHistorial} value='Borrar Historial'/>
                    <br/>
                    <br/>
                    <br/>
                    <Link to="/tablaresultados" className="App-link" >Ver Tabala de Resultados</Link>                
                </div>
            )
        }
    } 

    mostrarCuandoFinaliceSecuencia(){
        if(this.state.secuenciaFin === true){
            return(
                <div>
                    <h2 className="blanco">Ha finalizado!</h2> 
                    <Link to="/tablaresultados" className="App-link" >Ver tabla de resultados</Link>
                </div>
            )
        }
        
    }

    handleSubmit(event) {
        event.preventDefault();
        this.borrarHistorial();
        this.setState({value: this.state.fibonacci});
        this.verifHist = true;
        
        //lanzar al server
        axios.post('/secuencia/create',{
            number: this.state.fibonacci
        })

        this.devolverLista();

        this.timerID = setInterval(
            () => this.devolverIteracion(),
            2000
        );
    }

    devolverLista(){
        axios.get('/secuencia/list')
        .then(response=> this.setState({list:response.data}))
        .catch(err=>console.error(err))
    }
   
    empezar(event){
        this.i = 0 
        event.preventDefault();
        this.setState({secuenciaFin: false})
        if(this.state.value != null){
            this.setState({value: null});
        }
    }

    render() {
        if (this.state.value != null) {
            return (
                <div className="container divformulario col-xs-11 col-sm-10 col-md-6">
                    <h2 className="blanco">Mostrando...</h2>
                    <h1 key={this.state.data.paso} className="blanco">Paso: {this.state.data.paso} - Valor: {this.state.data.secuencia}</h1>
                    <br/>
                        {this.mostrarCuandoFinaliceSecuencia()}
                    <br/>
                    <input type="submit" className="btn btn-danger" onClick={this.empezar} value='Inicio'/>
                </div>
            );
        }else{
            return (
                <div className="container divformulario col-xs-11 col-sm-10 col-md-6" id="contenedor" >
                    <div className="container">
                        <img src={f} alt=""/>
                        <br/>
                        <br/>
                        <form onSubmit={this.handleSubmit} className="miformulario">
                                <div className="form-group">
                                    <input name="number" required value={this.state.value} onChange={this.handleChange} type="number" min="1" max="50" className="form-control" id="numero" placeholder="Entra el número de iteraciones"/>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Enviar"/>
                        </form>
                    </div>
                    <br/>
                    {this.botonLimparHistorial()}
                </div>
            );
        }
    }
}

export default FormInputNumber;