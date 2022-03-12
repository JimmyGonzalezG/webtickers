import React, { Component } from 'react';
import './App.css';
import './Components/Productos/RegistroProductos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rutas from './Components/Rutas/Rutas';
import { BrowserRouter as Router } from 'react-router-dom'





class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

 
render() {

  return (

    <Router>
    <div className="App">

      <h1>Aplicación Registro de Ventas</h1>
      <Rutas />
          
    </div>
    </Router>
  );
}
}
export default App;
