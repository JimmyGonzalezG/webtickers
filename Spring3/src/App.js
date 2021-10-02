import React, { Component, Fragment } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginButton } from './Components/Login/Login';
import { LogoutButton } from './Components/Login/Logout';
import { Profile } from './Components/Login/Profile';
import Productos from './Components/Productos/RegistroProductos'


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
  render() {

    return (

      <div>
        <h1>Aplicación Registro de Ventas</h1>
        <div className="App">
          <LoginButton />
          <Productos />
          <Profile />
          <LogoutButton />

        </div>
      </div>
    );
  }
}
export default App;
