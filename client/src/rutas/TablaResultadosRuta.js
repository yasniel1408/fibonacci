import React from 'react'
import TablaResutado from '../componentes/TablaResultados'

class TablaResultadosRuta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {  
        return (
            <div>
                <TablaResutado/>
            </div>
        );
    }
}

export default TablaResultadosRuta;