import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import React from 'react'
import { LoginButton } from '../Login/Login'
import { LogoutButton } from '../Login/Logout'
import Productos from '../Productos/RegistroProductos'
import {Ventas} from '../Ventas/Ventas'
import Navbar from '../Navbar'
import Privateroute from '../Login/Privateroute'
import { Profile } from '../Login/Profile'


export default function Rutas() {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={LoginButton}/>
                <Route exact path="/Logout" component={LogoutButton}/>
                <Route exact path="/Profile" component={Profile}/>
                <Privateroute exact path="/Ventas" component={Ventas}/>
                <Privateroute exact path="/Productos" component={Productos}/>
                   
                
                
                
                <Route path="*">
                    <h1>404 Not found</h1>
                </Route>
            </Switch>


        </Router>
    )
}
